import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShareIcon, XCircleIcon } from '@heroicons/react/outline'
import axios from 'axios'

type Props = {
  isOpen: boolean
  handleClose: () => void
  cookies: String
}

export const NFTmodal = ({  cookies, isOpen, handleClose }: Props) => {

  const [nft, setNFTs] = useState<any[]>([])

  useEffect(() =>{


    var metadataInt = setInterval(() =>{
      if(localStorage.getItem("acctCreated") === "no"){
        console.log('creating account')
      }else{
        // console.log('account created yo')
        callit()
        clearInterval(metadataInt)
      }
    },5000)

    function callit(){

      const headers = {
        "Content-Type": "application/json",
        "bx-dapp-id": "YX8XIKE4JAQ3",
        "bx-dapp-api-key": "JQcZPprVtBq0WCIehAj1ig0wY54MZOhN"
      }

      axios.get(`https://api-wip-flex.buildx.dev/api/dapp/owner/${cookies}/nft`,
      {
        headers: headers
      }).then((res) =>{
        // console.log(res.data?.Values?.length)
        if(res.data?.Values?.length > 0){
          if(nft.length > 0){
            console.log()
          } else{
          let ids = res.data?.Values
  
          ids.map((id: any) => {
            axios.get(`https://api-wip-flex.buildx.dev/api/dapp/owner/${cookies}/nft/${id}`,{
              headers: headers
            }).then((res) =>
            setNFTs(oldArray => [...oldArray, res.data])
            )
          })
        } 
        }
      }).catch((err) =>{
        console.log(err)
      })
    }
  }, [])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen py-10 px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full sm:p-6 dark:bg-gray-800">
              <button
                onClick={() => handleClose()}
                tabIndex={0}
                aria-pressed="false"
                className="absolute right-4 top-4"
              >
                <XCircleIcon className="h-6 w-6 cursor-pointer dark:stroke-white" />
              </button>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-100 mb-6"
                  >
                    Your Wordle NFT's
                  </Dialog.Title>
                  <div className="mt-2 mb-3">Your Account ID is: <b>{cookies}</b>. <br />  <br /> <u>If you erase your browser history you will lose your account</u> and your NFTs so please copy this number somewhere.</div>
                  <div className='text-xs mb-10'>Note: If you minted an NFT but it hasn't shown up yet, don't worry. It can take up to a minute to mint on the blockchain. Refresh after a minute or so and it should be there.</div>
                  <div className='mt-2 sm:grid sm:grid-cols-4 sm:gap-4 grid grid-cols-1'>
                    {nft?.map((obj: any) =>{
                      return(
                        <div className='whitespace-pre-line border-2 rounded-md py-5 shadow-lg cursor-pointer hover:shadow-2xl' onClick={() => navigator.clipboard.writeText(obj.image)}>
                          <p>{obj.image}</p>
                          <div>
                            <button
                              className="inline-flex justify-center items-center text-center mt-4 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                              onClick={() => navigator.clipboard.writeText(obj.image)}
                            >
                              <ShareIcon className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white" />
                              Copy Result
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
