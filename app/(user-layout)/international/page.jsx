"use client"


import { IconSearch } from '@tabler/icons-react';
import { IconAdjustments} from '@tabler/icons-react';
import Select from "react-dropdown-select";

const InternationalPackages = () => {
 
  const options = [
    {
      value: 1,
      label: 'Leanne Graham'
    },
    {
      value: 2,
      label: 'Ervin Howell'
    }
  ];
  
  return (
    <section id="international" className='py-12'>
      <div className="container">
        <div>
          <div>
            <IconSearch className='max-w-[20px]' />
            <input type="search"  className='border'/>
          </div>
          <div>
            <IconAdjustments/>
          </div>
          <div>
            <Select options={options} onChange={(values) => this.setValues(values)} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InternationalPackages
