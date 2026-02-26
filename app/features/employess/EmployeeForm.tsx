import { Camera, X } from "lucide-react"
import { Input } from "@/components/ui/input";
import { useRef, useCallback, type ChangeEvent, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose,DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {type Employee , type employeeProps} from "../types";
import { type KeyboardEvent } from "react";

import "@/app/globals.css";
import { employeeSchema, type employeeSchemaTypes } from "./validation";

const today = new Date();
const maxDate = today.toISOString().split('T')[0];

export const EmployeeForm = ({ openEmpDialog, closeEmpDialog, editEmployeeData,setOpen, editEmployee, addEmployee  }: employeeProps) => {
  const [fileInput, setFileInput] = useState<string | null | undefined>(null);
  const [imageReview, setImageReview] = useState<string | null | undefined>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const empltyValues: employeeSchemaTypes = { email: "", firstName: "", middleName: "", lastName: "", designation: "", phone: "", gender: "Female", dob: "", joiningDate: "", description: "" };

  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm({
    resolver: zodResolver(employeeSchema), defaultValues: empltyValues
  });
  const [error, setError] = useState<string | null>(null);
  const resetForm = () => {
    clearErrors(); reset(empltyValues); setFileInput(null); setSkillInput(''); setSkills([]); setError(null); setImageReview(null);
  };


  useEffect(() => {
    if (editEmployeeData) {
      setTimeout(() => {
        reset(editEmployeeData);
        setFileInput(editEmployeeData.profile);
        setImageReview(editEmployeeData.profile);
        if (editEmployeeData.skills) {
          setSkills(editEmployeeData.skills);
        }
      }, 0);
    } else { reset(empltyValues); }
  }, [editEmployeeData]);

  const [skillInput, setSkillInput] = useState<string>('');


  const onSubmit = async (data: employeeSchemaTypes) => {
    setImageReview(null); setSkillInput(''); setSkills([]);

    const userData: Employee = {
      ...data,
      _id: editEmployeeData && editEmployeeData._id ,
      profile: fileInput,
      skills: skills || []
    }
    if (editEmployeeData && editEmployeeData._id !== null && editEmployeeData._id !== undefined) {
        await editEmployee(editEmployeeData._id, userData);
    } else {
      await addEmployee(userData);
    } setOpen(false);
  };


  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = useCallback(() => { fileInputRef.current?.click(); }, []);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageReview(file.name);
      const reader = new FileReader()
      reader.onload = function (e) {
        const fileData = e.target?.result as string;
        setFileInput(fileData);
      }
      reader.readAsDataURL(file)
    };
  }, []);

  function handleImageCancel() {
    setFileInput(null); setImageReview(null);
    if (fileInputRef.current) { fileInputRef.current.value = ""; }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => { e.preventDefault(); }

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
    if (e.target.value === '') {
      setError(null);
    }
  }


  const handleAddSkill = () => {
    if (skills.includes(skillInput.trim())) {
      setError(`${skillInput.trim()} is  already added.`);
    } if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills(prevSkills => [...prevSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(prevSkills => prevSkills.filter(s => s !== skill));
  };
  {/*  <DialogContent className="w-full max-w-lg m-4 max-h-[90vh] overflow-y-auto p-6 rounded-2xl">

 <DialogContent className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
   <div className="space-y-6">
     <form className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
// sm:max-w-2xl  max-h-screen 
  return (
    <>
      <Dialog open={openEmpDialog} onOpenChange={closeEmpDialog}>
        <DialogContent className="w-120 md:w-full max-w-lg m-4 overflow-y-auto md:overflow-y-auto lg:overflow-y-auto sm:max-w-2xl  max-h-[90vh]" onPointerDownOutside={(e) => { e.preventDefault(); }}>
          <DialogHeader>
            <DialogTitle className="font-bold sm:ml-33 md:ml-0">{editEmployeeData ? `Edit ${editEmployeeData.firstName} Employee` : 'Add New Employee'}</DialogTitle>
          </DialogHeader>

           <DialogDescription className="sr-only">Fixed the warning</DialogDescription>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-fit mx-auto shadow-3xl p-2 ">
            <div className="grid grid-cols-1 ml-8 md:ml-0 w-80 md:w-full md:grid-cols-2 gap-x-10 gap-y-2 items-start">
              <div className="relative z-0 w-full group">
                <label htmlFor="firstName" className="">First name</label>
                <Input id="firstName" className="border border-black " placeholder=" " {...register('firstName')} />
                <p className="min-h-5 text-sm text-red-600">{errors.firstName?.message}</p>
              </div>
              <div className="relative z-0 w-full  group">
                <label htmlFor="middleName" className="">Middle name</label>
                <Input id="middleName" className="border border-black" placeholder=" " {...register('middleName')} />
                <p className="min-h-5 text-sm text-red-600">{errors.middleName?.message}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 ml-8 md:ml-0 w-80 md:w-full md:grid-cols-2 gap-x-10 md:gap-y-6 items-start">
              <div className="relative z-0 w-full  group">
                <label htmlFor="lastName" className="">Last name</label>
                <Input id="lastName" className="border border-black" placeholder=" " {...register('lastName')} />
                <p className="min-h-5 text-sm text-red-600">{errors.lastName?.message}</p>
              </div>
              <div className="relative z-0 w-full  group">
                <label htmlFor="gender" className="">Gender</label>
                <div className="mb-5 md:mt-2">
                  <input type="radio" value="Male" id="gender" {...register('gender')} /> Male
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                  <input type="radio" value="Female" id="gender" {...register('gender')} />Female
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 ml-8 md:ml-0  w-80 md:w-full md:grid-cols-2 gap-x-10 md:gap-y-6 items-start">
              <div className="relative z-0 w-full  group">
                <label htmlFor="email" className="">Email address</label>
                <Input id="email" className="border border-black" placeholder=" " {...register('email')} />
                <p className="min-h-5 text-sm text-red-600">{errors.email?.message}</p>
              </div>
              <div className="relative z-0 w-full  group">
                <label htmlFor="joiningDate" className="">Joining Date</label>
                <Input type="date" id="joiningDate" max={maxDate} onKeyDown={handleKeyDown} className="border border-black" placeholder=" " {...register('joiningDate')} />
                <p className="min-h-5 text-sm text-red-600">{errors.joiningDate?.message}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 ml-8 md:ml-0 w-80 md:w-full md:grid-cols-2 gap-x-10 md:gap-y-6 items-start">
              {/* ---------------------- */}
                  <div className="relative z-0 w-full mb-3 group">
                <label htmlFor="description" className="">Description</label>
                <textarea rows={2} className="rounded-md block py-2.5 px-0 w-80 md:w-70 text-sm text-heading border border-black appearance-nonefocus:outline-none focus:ring-0 focus:border-brand peer pl-3"{...register("description")} />
              </div>
              {/* ---------------------- */}
              <div className="relative z-0 w-full  group mt-5">
                <div className="flex">
                  <div className="w-70 md:w-55   bg-transparent border-2 border-b-2 border-default-medium rounded-md">
                    <label htmlFor="file" className=""><Camera className="ml-20" /></label><hr />
                    <button type="button" className="mb-2 ml-6 item-center" onClick={handleButtonClick}>Upload Profile Image</button>
                  </div>
                  <div className="inline-block m-2">
                    {imageReview && <div className="flex">
                      <img src={`${imageReview}` || ""} className="  w-12 h-12 rounded-3xl" alt="" />
                      <X size={24} onClick={handleImageCancel} />
                    </div>
                    }
                  </div>
                </div>
                <input type="file" ref={fileInputRef} id='file' onChange={handleFileChange} accept="image/png, image/gif,image/jpeg"
                  className=" py-2.5 px-0 w-full text-sm text-heading border border-black appearance-none focus:outline-none focus:ring-0 focus:border-brand peer pl-3 hidden" placeholder=" " />
              </div>
            </div>
            <div className="grid grid-cols-1 ml-8 md:ml-0 mt-5 md:mt-0 w-80 md:w-full md:grid-cols-2 gap-x-10 md:gap-y-6 items-start">
              <div className="relative z-0 w-full  group">
                <label htmlFor="dob" className="">DOB</label>
                <Input type="date" id="dob" max={maxDate} onKeyDown={handleKeyDown} className="border border-black" placeholder=" " {...register('dob')} />
                <p className="min-h-5 text-sm text-red-600">{errors.dob?.message}</p>
              </div>
              <div className="relative z-0 w-full  group">
                <label htmlFor="designation" className="">Designation</label>
                <select id="designation" className="block py-1.5 px-0 w-full text-sm text-heading  appearance-none focus:outline-none focus:ring-0 focus:border-brand peer pl-3 border border-black rounded-md"  {...register('designation')}>
                  <option value="">Select Designation</option>
                  <option value="Jr.Developer">Jr.Developer</option>
                  <option value="Sr.Developer" >Sr.Developer</option>
                  <option value="Designer" >Designer</option>
                  <option value="Project Manager">Project Manager</option>
                </select>
                {errors.designation && <span style={{ color: 'red' }}>{errors.designation.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 ml-8 md:ml-0 w-80 md:w-full md:grid-cols-2 gap-x-10 gap-y-6 items-start mt-5 md:mt-0">
              <div className="relative z-0 w-full  group">
                <label htmlFor="skills" className="">Skills</label>
                <div className=" border border-black  px-1 py-1 flex flex-wrap gap-1 items-center min-h-10.5 focus:outline-none focus:ring-0 focus:border-brand peer pl-3 rounded-md">
                  {skills.map((skill) => (<Badge key={skill} variant="secondary" className="flex items-center gap-1">{skill}
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveSkill(skill)}><X className="h-3 w-3" /></Button>
                  </Badge>))}
                  <Input value={skillInput} placeholder="Type and press Enter" className="border-none shadow-none focus-visible:ring-0 flex-1 min-w-30" onChange={handleSkillChange} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddSkill() } }} />
                </div>  {error && <p className="min-h-5 text-sm text-red-600">{error}</p>}
              </div>

              {/* ---------------------- */}
          
              <div className="relative z-0 w-full  group">
                <label htmlFor="phone" className="">Phone number</label>
                <Input id="phone" type="number" className="border border-black h-10.5" placeholder=" " {...register('phone')} />
                <p className="min-h-5 text-sm text-red-600">{errors.phone?.message}</p>
              </div>
              {/* ---------------------- */}
            </div>
            <div className="flex ">
              <Button type="submit" className="bg-sky-700 w-40 md:w-50 h-10 ml-0 mr-7 md:mr-0 md:ml-20 mt-1" > Submit</Button>
              <DialogClose asChild>
                <Button type="button" className="w-40 md:w-50 h-10 ml-5 mt-1" onClick={resetForm}> Cancel</Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )

}


