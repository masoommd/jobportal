import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobsByText } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const filteredAdminJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobsByText) {
          return true;
        }
        return (
          job?.title.toLowerCase().includes(searchJobsByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobsByText.toLowerCase())
        );
      });
    setFilterJobs(filteredAdminJobs);
  }, [allAdminJobs, searchJobsByText]);

  return (
    <div>
      <Table>
        <TableCaption>List of your registered jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Job type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (
            <tr key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.jobType}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => {
                        return deleteHandler(job._id);
                      }}
                      className="flex items-center gap-2 w-fit cursor-pointer mb-2"
                    >
                      <Trash2 className="w-4" />
                      <span>Delete</span>
                    </div>

                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>

                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
