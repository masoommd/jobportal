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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((state) => state.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`,{
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/admin/companies');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(()=>{
    const filteredCompany = companies.length >= 0 &&companies.filter((company) => {
        if(!searchCompanyByText){
            return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  },[companies,searchCompanyByText])

  return (
    <div>
      <Table>
        <TableCaption>List of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.map((company) => (
            <tr key={company._id}>
              <TableCell >
                <Avatar>
                  <AvatarImage src={company.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div onClick={()=>{
                    return deleteHandler(company._id);
                  }} className="flex items-center gap-2 w-fit cursor-pointer mt-2">
                      <Trash2 className="w-4" />
                      <span>Delete</span>
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

export default CompaniesTable;
