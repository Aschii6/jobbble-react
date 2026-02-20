function Home() {
    return (
        <div className={"flex flex-col items-center justify-center my-2 gap-2"}>
            <h1 className={"text-3xl text-primary-foreground"}>Welcome to Jobbble</h1>
            <p className={"text-2xl"}>Your friend in keeping track of job applications and their related processes.</p>
            <p className={"text-2xl font-bold"}>Quick usage guide:</p>
            <ul className={"list-disc [&>li]:ml-4 text-lg"}>
                <li>Create an Account</li>
                <li>Add a Company</li>
                <li>Add a Job Application for a given Company</li>
                <li>Add Steps to an Application - like interviews</li>
                <li>Check out the calendar for Steps and enjoy certain statistics</li>
            </ul>
        </div>
    );
}

export default Home;