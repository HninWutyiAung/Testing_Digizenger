import logo from "/images/Digizenger2.png";

function NewFeedNav({activeChat}){

    return(
        <section className="border-b-2 h-[50px] border-[#ECF1F4] bg-white w-[24.2%] 2xl:w-[33.3%] overflow-hidden z-10 fixed logo-nav-small-screen">
            <div>
                <img src={logo} className="w-[180px] ml-[2px]"/>
            </div>
        </section>
    )
}

export default NewFeedNav;