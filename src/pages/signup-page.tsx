import {useRegister} from "@/hooks/useRegister.ts";
import {useAuthActions} from "@/stores/auth-store.ts";
import {useRouter} from "@tanstack/react-router";
import {useForm} from "react-hook-form";

type RegisterFormData = {
    email: string;
    username: string;
    password: string;
}

function SignupPage() {
    const registerMutation = useRegister();
    const {setAccessToken} = useAuthActions();
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormData>();

    const handleRegister = async (email:string, username:string, password: string) => {
        try {
            const data = await registerMutation.mutateAsync({email, username, password});
            setAccessToken(data.token);
            const from = router.state.location.search?.from || "/dashboard";
            router.navigate({to: from}).then();
        } catch (error) {
            console.error("Register failed:", error);
        }
    }

    return (
        <div className={"flex flex-col items-center justify-center"}>
            <h1 className={"mt-8 text-2xl text-accent-foreground"}>Register</h1>
            <form onSubmit={handleSubmit(({email, username, password}) => handleRegister(email, username, password))} className={"flex flex-col items-center gap-4 mt-6 w-full max-w-md px-4"}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {required: "Email is required"})}
                    className={"border p-2 rounded w-full"}
                />
                {errors.email && <span className={"text-red-500"}>{errors.email.message}</span>}

                <input
                    type="text"
                    placeholder="Username"
                    {...register("username", {required: "Username is required"})}
                    {...register("username", {minLength: {value: 6, message: "Username must be at least 6 characters"}})}
                    className={"border p-2 rounded w-full"}
                />
                {errors.username && <span className={"text-red-500"}>{errors.username.message}</span>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {required: "Password is required"})}
                    className={"border p-2 rounded w-full"}
                />
                {errors.password && <span className={"text-red-500"}>{errors.password.message}</span>}

                <button type="submit" className={"bg-primary text-primary-foreground p-2 rounded-lg w-1/2"} disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? "Logging in..." : "Register"}
                </button>

                {registerMutation.error && <span className={"text-red-500"}>{registerMutation.error.message}</span>}
            </form>
        </div>
    );
}

export default SignupPage;