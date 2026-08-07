import React, { useState } from 'react'
import {SmoothInput} from '@/components/ui/skiper-ui/skiper106'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function CompanyRes() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const phoneError = formData.phoneNumber.length > 0 && formData.phoneNumber.length < 10;
    const passwordMismatch =
        formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;
    const passwordError =
        formData.password.length > 0 &&
        (formData.password.length < 8 ||
            !/[A-Za-z]/.test(formData.password) ||
            !/\d/.test(formData.password) ||
            !/[^A-Za-z0-9]/.test(formData.password));

    async function formhandle(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (phoneError || passwordError || passwordMismatch) return;
        console.log(formData);
        setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        });

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register/company`, formData);
        if (response.status === 200 || response.status === 201) {
        alert('Company Registered Successfully!');
        } else { 
            alert('Failed to register company.');
        }
        router.push('/home')
        console.log(response.data);

    }



    return (
        <div>
            <form className="space-y-6" onSubmit={formhandle}>
                <SmoothInput
                    type="text"
                    placeholder="Company Name" required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="inputform text-base"
                    wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
                />
                <SmoothInput
                    type="email"
                    placeholder="Company Email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="inputform text-base"
                    wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
                />
                <div>
                    <SmoothInput
                        type="tel"
                        placeholder="Company Phone Number" required minLength={10}
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="inputform text-base"
                        wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
                    />
                    {phoneError && <p className="mt-1 text-sm text-(--secondryColor)" role="alert">Phone number must contain at least 10 digits.</p>}
                </div>
                <div>
                    <SmoothInput
                        type="password"
                        placeholder="Password" required minLength={8}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="inputform text-base"
                        wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
                    />
                    {passwordError && <p className="mt-1 text-sm text-red-500" role="alert">Password must be at least 8 characters and include a letter, number, and special character.</p>}
                </div>
                <div>
                    <SmoothInput
                        type="password"
                        placeholder="Confirm Password" required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="inputform text-base"
                        wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
                    />
                    {passwordMismatch && <p className="mt-1 text-sm text-(--secondryColor)" role="alert">Passwords do not match.</p>}
                </div>
                <button type="submit" className="actionBtn">
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default CompanyRes
