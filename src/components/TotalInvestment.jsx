import React from 'react'

const TotalInvestment = ({addInvestment,total}) => {
  return (
    <section className='flex items-center mt-8  gap-5'>
                <div className={`card flex items-center justify-between min-h-[100px] p-3 gap-5 min-w-[250px] bg-[#1d1d1d] rounded-md text-white thinShadow ${addInvestment ? "" : "relative"} `}>
                  

                    <p className='text-sm'>
                        Total amount 
                    </p>
                    <p className='text-[1.5rem]'>
                      <span className='mr-2'>Rs</span>
                        {
                          total
                        }
                    </p>
                  

                </div>

              
               
            </section>
  )
}

export default TotalInvestment