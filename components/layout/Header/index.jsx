import WalletConnector from 'components/WalletConnector';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showWalletConnector, hideWalletConnector, showSidebar, hideSidbar, showSetting } from 'store/slices/utilSlice';
import { useWeb3React } from '@web3-react/core';
import { useUtil} from 'store/hook';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faWallet, faBarsStaggered, faBell, faGear, faMagnifyingGlass, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import TokenSelector from './TokenSelector';
import NetworkSelector from './NetworkSelector';

export default function Header() {
    const [ isSearch, showSearchBox ] = useState(false);
    const { account, chainId } = useWeb3React();
    const dispatch = useDispatch();
    const { isWalletConnector, isSidebar } = useUtil();

    const onSidebar = function() {
        if(isSidebar) {
            dispatch(hideSidbar());
        } else {
            dispatch(showSidebar())
        }
        console.log(isSidebar);
    }

    return (
        <div className={"z-30 fixed bg-[black] w-full top-0 p-[10px] flex justify-center lg:h-[61px] h-[120px] border-b-[1px] border-b-[#2c2c2c]"}>
            <div className='w-full flex justify-between items-center flex-col lg:flex-row'>
                <div className='w-full lg:w-auto h-[50px] items-center flex justify-between min-w-[200px]'>
                    <div className='flex'>
                        <FontAwesomeSvgIcon icon={ faBarsStaggered } className="w-[24px] h-[24px] mr-[10px] ml-[20px] w-[24px] text-[#5cea69]"
                            onClick={() => onSidebar()}/>
                        <Image
                            src='/images/logos/logo.png' 
                            alt='GoCharts'
                            width={139}
                            height={25}
                        />
                    </div>
                    <FontAwesomeSvgIcon icon={ isSearch ? faCircleXmark : faMagnifyingGlass } className="w-[24px] h-[24px] mr-[10px] w-[24px] text-[#5cea69] lg:hidden"
                            onClick={() => showSearchBox(!isSearch)}/>
                </div>

                <div className='flex lg:justify-end justify-center items-center'>
                    <TokenSelector cls= {"lg:flex " + (isSearch ? "flex" : "hidden")}/>

                    <div className={(isSearch ? "hidden " : "flex ") + 'lg:flex'}>
                        
                        <FontAwesomeSvgIcon icon={ faGear } className="w-[24px] h-[24px] mr-[10px] w-[24px] text-[#5cea69]"
                            onClick={() => dispatch(showSetting())}/>
                        <FontAwesomeSvgIcon icon={ faBell } className="w-[24px] h-[24px] mx-[10px] w-[24px] text-[#5cea69]"
                            onClick={() => onSidebar()}/>
                    </div>
                    <NetworkSelector cls={(isSearch ? "hidden " : "flex ")}/>
                    <div className={(isSearch ? "hidden " : "") + 'lg:flex items-center'}>
                        <button 
                            className='relative bg-[#5cea69] hover:bg-[#40A349] rounded-[6px] h-[40px] px-[20px] flex items-center justify-center mr-[10px] text-[1.1rem]'
                                onClick={() => {dispatch(showWalletConnector())}}
                            >
                            {account ? account.substring(0, 6) + "..." + account.substring(account.length - 4) : 'Connect wallet'}
                        </button>
                    </div>
                </div>
                
            </div>
            { isWalletConnector &&
                <WalletConnector/>
            }
            { isWalletConnector && 
                <div className='z-45 fixed w-full h-full bg-[#00000050] top-0'
                onClick={() => {dispatch(hideWalletConnector())}}
                ></div>
            }           
        </div>
    )
}