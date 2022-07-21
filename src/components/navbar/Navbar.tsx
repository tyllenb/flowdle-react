import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  DocumentAddIcon
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  setIsNFTModalOpen: (value: boolean) => void

}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  setIsNFTModalOpen
}: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <p className="text-xl ml-28 font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="right-icons">
          <div className='flex mr-4 cursor-pointer dark:stroke-white hover:text-blue-500 hover:font-bold'
            onClick={() => setIsNFTModalOpen(true)}
            >
            <DocumentAddIcon className="h-6 w-6 mr-1 cursor-pointer dark:stroke-white"/>
            NFTs
          </div>
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
