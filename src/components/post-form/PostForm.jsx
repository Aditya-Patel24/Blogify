import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const uploadImage = async (image) => {
    try {
      const file = await appwriteService.uploadFile(image);
      return file ? file.$id : null;
    } catch (error) {
      console.error("Image upload failed", error.message);
      return null;
    }
  };

  const submit = async (data) => {
    setLoading(true);
    try {
      if (!userData || !userData.$id) {
        throw new Error("User is not authenticated or userId is missing");
      }

      let fileId = null;
      if (data.image && data.image.length > 0) {
        fileId = await uploadImage(data.image[0]);
      }

      const truncatedContent = data.content.length > 255 ? data.content.substring(0, 255) : data.content;

      const postData = {
        title: data.title,
        slug: data.slug,
        content: truncatedContent,
        feturedImage: fileId || post?.feturedImage,
        status: data.status,
        userId: userData.$id,
      };

      let result;
      if (post) {
        if (fileId && post.feturedImage) {
          await appwriteService.deleteFile(post.feturedImage);
        }
        result = await appwriteService.updatePost(post.$id, postData);
      } else {
        result = await appwriteService.createPost(postData);
      }

      if (result) {
        navigate(`/post/${result.$id}`);
      } else {
        console.error("Post submission failed: result is undefined");
      }
    } catch (error) {
      console.error("Post submission failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  console.log('userData:', userData);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: "Title is required" })}
          error={errors.title}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: "Slug is required" })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
          error={errors.slug}
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          error={errors.content}
          maxLength={255}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post && "Image is required" })}
          error={errors.image}
        />
        {post && post.feturedImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.feturedImage)}
              alt={post.title}
              className="rounded-lg"
              onError={(e) => {
                e.target.src = '/fallback-image.jpg'; // Ensure this path is correct
                console.error("Failed to load image:", e);
              }}
            />
            {console.log("Image preview URL:", appwriteService.getFilePreview(post.feturedImage))}
          </div>
        )}
        <Select
          options={["active", "draft"]}
          label="Status"
          className="mb-4"
          {...register("status")}
          error={errors.status}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
