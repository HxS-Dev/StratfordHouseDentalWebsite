import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


function Dropdown() {
     return (
          <Menu>
               <MenuButton className="py-2 px-2.5 text-white text-base font-medium leading-6 tracking-[-0.32px] bg-blue-1400 flex items-center shadow-4xl"><img src="/images/us-flag.png" alt=''></img><span className='mr-3 ml-2'> United States</span><img src="/images/chevron-down.svg"></img> </MenuButton>
               <MenuItems anchor="bottom" className="bg-white px-4 py-2">
                    <MenuItem>
                         <a className="block data-focus:bg-blue-100" href="/">
                              Settings
                         </a>
                    </MenuItem>
                    <MenuItem>
                         <a className="block data-focus:bg-blue-100" href="/">
                              Support
                         </a>
                    </MenuItem>
                    <MenuItem>
                         <a className="block data-focus:bg-blue-100" href="/">
                              License
                         </a>
                    </MenuItem>
               </MenuItems>
          </Menu>
     )
}

export default Dropdown
