import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfilePhotoDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
      file: user?.profile?.profilePhoto || "",
    });
    
    const dispatch = useDispatch();
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update/picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px] rounded-full"
          onInteractOutside={() => setOpen(false)}
        >
            
          <DialogHeader>
            <DialogTitle>Update Profile </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
            

              <div className="grid grid-cols-4 items-center gap-1.5">
                <Label htmlFor="file" className="text-left col-span-1">
                  Profile Picture
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  className="col-span-3"
                  onChange={fileChangeHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-black text-white text-md rounded hover:bg-black "
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfilePhotoDialog;
