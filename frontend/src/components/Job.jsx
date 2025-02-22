import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Job = ({job}) => {
  const companyLogo = job?.company?.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
  const navigate = useNavigate();
  // const jobId = "mbcbjdw";
  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{dayAgoFunction(job?.createdAt) === 0 ? 'Today' : `${dayAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button> 
          <Avatar>
            <AvatarImage src={companyLogo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
        </div>
        <div className="flex items-center gap-4 mt-4">
            <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline" className="rounded-full border-2">Details</Button>
            <Button className="bg-[#1e6862] rounded-full text-white hover:bg-[#9302f3]">Save For Later</Button>
        </div>
    </div>
  );
};

export default Job;
