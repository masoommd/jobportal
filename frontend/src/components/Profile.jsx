import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, ImagePlus, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import UpdateProfilePhotoDialog from "./UpdateProfilePhotoDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [openPic, setOpenPic] = useState(false);
  const {user} = useSelector(state=>state.auth);
  let profilePhoto = user?.profile?.profilePhoto ||"https://github.com/shadcn.png";
  const isResume = user?.profile?.resume || false;

  
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profilePhoto} />
            </Avatar>
            <Button onClick={()=>setOpenPic(true)} className="text-right rounded-full h-[30px] w-[0.5px] bg-white absolute left-80 top-40 hover:bg-gray-300 "  variant="outline">
            <ImagePlus />
          </Button>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex flex-wrap items-center gap-1 border-black">
            {user?.profile?.skills.length != 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} variant="ghost">
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
      <UpdateProfilePhotoDialog open={openPic} setOpen={setOpenPic}/>
    </div>
  );
};

export default Profile;
