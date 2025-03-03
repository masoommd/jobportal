import React, { use, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";


const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {companies} = useSelector(state => state.company);
  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({...input,companyId:selectCompany._id});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <div>
        <Navbar />
        <div className="flex items-center justify-center w-screen my-5 ">

        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-400 shadow-lg rounded">
          <div className="grid grid-cols-2 gap-4">
            <div >
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventhandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div >
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventhandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div >
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventhandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div >
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventhandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div >
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventhandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div >
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventhandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div >
              <Label>Experience level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventhandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div >
              <Label>No. of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventhandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {
              companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder={'Select a Company'}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      {
                        companies.map((company) => {
                          return (
                            <SelectItem value={company?.name.toLowerCase()}>
                              {company.name}
                            </SelectItem>
                          )
                        })
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 text-white text-md rounded"
            >
              Post New Job
            </Button>
          )}
          {
            companies.length === 0  && <p className="text-sm text-red-600 font-bold text-center my-4">*Please register a company first before posting a job</p>
          }
        </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
