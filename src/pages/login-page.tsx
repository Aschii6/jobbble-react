import {useLogin} from "@/hooks/useLogin.ts";
import {useAuthActions} from "@/stores/auth-store.ts";
import {useRouter} from "@tanstack/react-router";
import {useForm} from "react-hook-form";

type LoginFormData = {
    username: string;
    password: string;
}

function LoginPage() {
    const loginMutation = useLogin();
    const {setAccessToken} = useAuthActions();
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>();

    const handleLogin = async (username:string, password: string) => {
        try {
            const data = await loginMutation.mutateAsync({username, password});
            setAccessToken(data.token);
            const from = router.state.location.search?.from || "/dashboard";
            router.navigate({to: from}).then();
        } catch (error) {
            console.error("LoginPage failed:", error);
        }
    }

    return (
        <div className={"flex flex-col items-center justify-center"}>
            <h1 className={"mt-8 text-2xl text-accent-foreground"}>Login</h1>
            <form onSubmit={handleSubmit(({username, password}) => handleLogin(username, password))} className={"flex flex-col items-center gap-4 mt-6 w-full max-w-md px-4"}>
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

                <button type="submit" className={"bg-primary text-primary-foreground p-2 rounded-lg w-1/2"} disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Logging in..." : "LoginPage"}
                </button>

                {loginMutation.error && <span className={"text-red-500"}>{loginMutation.error.message}</span>}
            </form>
        </div>
    );
}

export default LoginPage;