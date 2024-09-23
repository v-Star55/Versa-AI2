const landingLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
    return ( 
            <main className="w-full h-full bg-black overflow-x-hidden">
                <div className="max-auto max-w-screen-xl h-full w-full">   
                {children}
                </div>
            </main>
     );
}
 
export default landingLayout;