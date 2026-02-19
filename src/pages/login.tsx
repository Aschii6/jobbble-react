import {useLoginMutation} from "@/api/auth.ts";
import {useAuthActions} from "@/stores/auth-store.ts";
import {useRouter} from "@tanstack/react-router";

function Login() {
    const loginMutation = useLoginMutation();
    const {setAccessToken} = useAuthActions();
    const router = useRouter();

    const handleLogin = async (username:string, password: string) => {
        try {
            const data = await loginMutation.mutateAsync({username, password});
            setAccessToken(data.token);
            const from = router.state.location.search?.from || "/dashboard";
            router.navigate({to: from}).then();
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const username = formData.get("username") as string;
                const password = formData.get("password") as string;
                handleLogin(username, password).then();
            }}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit" disabled={loginMutation.isPending}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;