import React  from 'react';
import './Header.css'
function Header() {
     return (
         <>
           {/* <div className='header'>

               <img src = {require('./logo 2.png')}  className= "logo2" />
               <p className='Qp'>Quantifine Pharmacy</p>
           </div> */}

           {/* <div className='bg-[#ffffff] w-full h-[55px] fixed border-b overflow-auto' >
           <img src = {require('./logo2.png')} width={60}  className= "ml-[50px] mt-3" />
           <span className='text-[#082161] absolute top-2 left-10 ml-20 text-[24px]'>Quantifine Pharmacy</span>
           </div> */}
            <div className="flex">
                    <img src = {require('./logo2.png')} width={60}  className= "ml-[50px] mt-3"/>
                    <h3 className='text-[#082161] text-xl mt-3'><b>Quantifine Pharmacy</b></h3>

                </div>
         </>
     )
}
export default Header;