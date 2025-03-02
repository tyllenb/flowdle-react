import Countdown from 'react-countdown'
import { DocumentAddIcon, ShareIcon } from '@heroicons/react/outline'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { mintNFT, shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
} from '../../constants/strings'
import { MintNFT } from '../stats/MintNFT'
import { ENABLE_MIGRATE_STATS } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  solution: string
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  handleMintNFT: () => void
  handleMigrateStatsButton: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
  cookies: string
}

export const StatsModal = ({
  isOpen,
  handleClose,
  solution,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  handleMintNFT,
  handleMigrateStatsButton,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
  cookies
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
        {ENABLE_MIGRATE_STATS && (
          <MintNFT handleMigrateStatsButton={handleMigrateStatsButton} />
        )}
      </BaseModal>
    )
  }

  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram
        gameStats={gameStats}
        isGameWon={isGameWon}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <div>
            <button
              type="button"
              className="inline-flex justify-center items-center text-center mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                shareStatus(
                  solution,
                  guesses,
                  isGameLost,
                  isHardMode,
                  isDarkMode,
                  isHighContrastMode,
                  cookies,
                  handleShareToClipboard,
                )
              }}
            >
              <ShareIcon className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white" />
              Share Result
            </button>
          </div>
        </div>
      )}
      {ENABLE_MIGRATE_STATS && (
        <div>
          <hr className="mt-4 -mb-4 border-gray-500" />
          {/* <MintNFT handleMigrateStatsButton={handleMigrateStatsButton} /> */}
          <button
              type="button"
              className="inline-flex disabled:bg-gray-300 justify-center items-center text-center mt-6 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              disabled={localStorage.getItem("acctCreated") === "no"}
              onClick={() => {
                mintNFT(
                  solution,
                  guesses,
                  isGameLost,
                  isHardMode,
                  isDarkMode,
                  isHighContrastMode,
                  cookies,
                  handleShareToClipboard,
                  handleMintNFT
                )
              }}
            >
              <DocumentAddIcon className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white" />
              Mint Result as NFT
            </button>
            <div className='text-xs mt-2'>
              If the mint button is disabled it means your account is still being created. Give it a minute and refresh the page and you should be able to mint then.
            </div>
        </div>
      )}
    </BaseModal>
  )
}
