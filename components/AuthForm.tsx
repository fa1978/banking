'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import Image from 'next/image' 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from '@/components/CustomInput'
import { authformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'



const AuthForm = ({type}:{type:string}) => {
   const router =useRouter();
   const [user, setUser] = useState(null);
   const formSchema = authformSchema(type) ;
   const [isLoading,setIsLoading]=useState(false) ;
   //const loggedInUser = await getLoggedInUser();
   // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:""
        },
      })

      const onSubmit=async (data: z.infer<typeof formSchema>)=>{
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true) ;
        try {
            //Sign up  with appwrite & create plaid link token
            if (    type === 'sign-up') {
                const newUser = await signUp(data) ;
                setUser(newUser) ;
            }
            else if (type === 'sign-in'){
               const response = await signIn({
               email:data.email,
               password:data.password
                })

               if (response) {
                router.push('/') ;
                
              }
            }
           
        } catch (error) {
            
            console.log(error);
        } finally {setIsLoading(false)}
       

      }

   // const [user,setUser]=useState(null) ;
   

    

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
       <Link  href={"/"} className="cursor-pointer items-center gap-1  flex">
        <Image src="/icons/logo.svg" width={34} height={34} alt='Horizon logo'/>

          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>{user 
                    ? 'Link Account'
                    : type === 'sign-in' ? 'Sign In' : 'Sign Up '}</h1>
            <p className='text-16 font-normal text-gray-600'>{user 
                    ? 'Link Your Account to get started'
                    : 'Please enter your details'}</p>
        </div>
      </header>
      {user ? (<div className='flex flex-col gap'>{/* PlaidLink */}</div>) :(
        <>
          <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                 {type === 'sign-up' && (
                   <> 

                    <div className='flex gap-4'>
                      <CustomInput control={form.control}  name='firstName' label='First Name' placeholder='ex:Farouk' />
                      <CustomInput control={form.control}  name='lastName' label='Last Name' placeholder='ex:Hamad' />
                    </div>
                
                    <CustomInput control={form.control}  name='adress1' label='Adress' placeholder='enter your specific Adress' />
                    <CustomInput control={form.control}  name='city' label='City' placeholder='enter your specific City' />
                    
                    <div className='flex gap-4'>
                      <CustomInput control={form.control}  name='state' label='State' placeholder='ex:NY' />
                      <CustomInput control={form.control}  name='postalCode' label='Postal Code' placeholder='ex:25442' />
                    </div>

                    <div className='flex gap-4'>
                      <CustomInput control={form.control}  name='dateOfBirth' label='Date of Birth' placeholder='yyyy-mm-dd' /> 
                      <CustomInput control={form.control}  name='ssn' label='SSN' placeholder='ex:1234' /> 
                    </div>
                    
                   </>
                )}
           
                   
                     <div className='form-item'>
                      <CustomInput control={form.control}  name='email' label='Email' placeholder='enter your Email' />
                      <CustomInput control={form.control}  name='password' label='Password' placeholder='enter your Password' />
                     </div>
                
            
          
            <div className='flex flex-col gap-4'>
              <Button type="submit" disabled={isLoading} className='form-btn'>{isLoading ? (
                <>
                  <Loader2 size={20} className='animate-spin'/> &nbsp;
                    Loading...
                </>): type === 'sign-in' ? 'Sign-In':'Sign Up'}</Button>
           
            </div>
        
           </form>
       </Form>
       <footer className='flex justify-center gap-1'>
         <p className='text-14 font-normal text-gray-600'>{type === 'sign-in' ? "Don't have an account" :"Already have an account" }</p>
         <Link  href={type === 'sign-in' ? '/sign-up' :'/sign-in'} className='form-link'>
          {type === 'sign-in' ? 'Sign Up' :'Sign In'}</Link>
       </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm