import DisplayBlogs from "../../components/DisplayBlogs";
import NavIn from "../../components/nav/NavIn";




function HomeIn() {
    return (
    <div className="min-h-screen bg-gray-100">
        <NavIn/>
        <DisplayBlogs/>
        <main className="container mx-auto px-4 py-8">
            
        </main>
    </div>
    );
}

export default HomeIn;