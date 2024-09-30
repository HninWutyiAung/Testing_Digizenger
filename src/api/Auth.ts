import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const authApi = createApi ({
    reducerPath: "authApi",
    baseQuery : fetchBaseQuery({
        baseUrl :"http://digizenger.info/api/v1"
    }),
    endpoints: (builder)=>({
        registerUser: builder.mutation ({
            query : (body: {firstName: string,lastName:string ,email:string,password:string,phone:string ,dateOfBirth:string,gender:string,country:string,city:string}) =>{
                return{
                    url : '/auth/register',
                    method: 'POST',
                    body ,
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }
            }
        }),
        verifyEmailOrPhone: builder.mutation ({
            query : ({emailOrPhone,otp}) => {
                return{
                method: 'put',
                url: '/auth/verify-account?emailOrPhone=htetphyoemaung3363@gmail.com&otp=158103',
                body: JSON.stringify({ emailOrPhone, otp }), 
                headers:{
                    'Content-type' : 'application/json'
                }
            }
            }

        }),
        loginUser: builder.mutation({
            query: (credentials) => {
            return{
              url: '/auth/login',
              method: 'POST',
              body: credentials,
            }},
        }),

        resendCode: builder.mutation({
            query: (emailOrPhone) =>{
                return{
                    url:`resend-code?emailOrPhone=${emailOrPhone}`,
                    method: 'put',
                    headers:{
                        'Contdnt-type' : 'application/json'
                    }
                }
            }
        })
})
})

export const {useRegisterUserMutation , useVerifyEmailOrPhoneMutation ,useLoginUserMutation , useResendCodeMutation} = authApi;