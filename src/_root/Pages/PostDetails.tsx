import PostImage from "@/components/shared/PostImage";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useGetPostById, useDeletePost, useGetCurrentUser, useDeleteSavePost, useGetRelatedPosts } from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import { selectUser } from "@/redux/slice/slice";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";


const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const { data: post, isLoading } = useGetPostById(id);
  const { mutate: deletePost } = useDeletePost();
  const {mutateAsync: deleteSavedPost, isPending: isDeleting} = useDeleteSavePost();
  const {data: currentUser} = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post?.$id === post?.$id);
  const {data: relatedPosts, isPending: iFetchingRelated} = useGetRelatedPosts(post?.creator.$id || "",post?.$id || "");



  const handleDeletePost = async() => {
    if(savedPostRecord){
     await deleteSavedPost(savedPostRecord.$id);
    }
    if(!isDeleting){
      deletePost({ postId: id || "", imageId: post?.imageId });
      navigate("/");
    }

  };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {timeAgo(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className={`flex-center gap-4 ${user.$id !== post?.creator.$id && "hidden"}`}>
                <Link
                  to={`/update-post/${post?.$id}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn`}>

                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                  
                </Button>
              </div>
            </div>

            <div className="flex flex-col w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              
              <ul className="flex gap-1 mt-2">
            
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}

              </ul>

              <hr className="border w-full border-dark-4/80" />
            
            </div>

            <div className="flex flex-col flex-1">

                <div className="flex w-full gap-2 p-1">
                  <Link
                      to={`/profile/${post?.creator.$id}`}
                      className="flex items-center gap-3">
                        <img
                        src={
                          post?.creator.imageUrl ||
                          "/assets/icons/profile-placeholder.svg"
                        }
                          alt="creator"
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"/>  
                  </Link>

                  <div className="flex gap-1 flex-col w-full h-">

                    <p className="text-light-3">
                      {post?.creator.name}
                    </p>

                    <p className="overflow-ellipsis w-2">
                        adwawdawdddddddddddddddddddddddaawdadw MOSTAFA
                        dwadawdaaaaaaaaaawda
                    </p>

                      
                      

                  </div>



                </div>


            </div>

            

          

            <div className="w-full">
              <PostStats post={post} userId={user.$id} />
            </div>
          </div>
        </div>
      )}
      {
        iFetchingRelated ? (<Loader />) : (<div className="w-full max-w-5xl">
          <hr className="border w-full border-dark-4/80" />
          <h3 className="body-bold md:h3-bold w-full my-10">
            More Related Posts
          </h3>
          <div className="flex flex-wrap w-full gap-x-10 md:gap-x-5">
             {relatedPosts?.documents.map((post) => (
             <div key={post.$id} className="w-full sm:w-1/3 md:w-1/3 lg:w-1/4">
               <PostImage post={post} />
             </div>
          ))}
          </div>
       
        </div>)
      }

    </div>
  );
};

export default PostDetails;