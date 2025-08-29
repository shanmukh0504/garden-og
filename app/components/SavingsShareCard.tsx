'use client'
import React from 'react';
import { ArrowRightIcon, Typography } from '@gardenfi/garden-book';

type Props = {
  time: boolean;
  inputAssetSymbol: string;
  outputAssetSymbol: string;
  feesSaved?: string;
  timeSaved?: string;
  flowersSrc?: string;
  pinkStrokesSrc?: string;
  flowersLogoSrc?: string;
};

export const SavingsShareCard: React.FC<Props> = ({
  time = true,
  inputAssetSymbol = 'BTC',
  outputAssetSymbol = 'USDC',
  feesSaved = '$20.01',
  timeSaved = '01m 23s',
  flowersSrc = '/flowers.png',
  pinkStrokesSrc = '/PinkStrokes.png',
  flowersLogoSrc = '/flowersLogo.png',
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="z-0 flex flex-col justify-between rounded-2xl p-4 min-w-[424px] w-full bg-white">
        <div className="z-10 font-dark-grey flex flex-col items-center w-full justify-center">
          <div className="flex w-full items-center justify-start">
            <img src={flowersSrc} alt="flowers" className="w-auto" />
          </div>
          <div className="relative mb-9 mt-7 flex flex-col gap-1">
            <img
              src={pinkStrokesSrc}
              alt="pink strokes"
              className="absolute -bottom-8 -right-6 z-5 w-fit"
            />
            <div className="z-20 flex items-center justify-between gap-2 h-7">
              <Typography
                size="h4"
                weight="medium"
              >
                {time ? 'Time Saved' : 'Cost Saved'}
              </Typography>
              <Typography
                size="h4"
                weight="medium"
                className="flex items-center gap-1"
              >
                <Typography
                  size="h4"
                  weight="medium"
                >
                  {inputAssetSymbol}
                </Typography>
                <ArrowRightIcon className="h-[14px] w-[14px] px-[1px]" />
                <Typography
                  size="h4"
                  weight="medium"
                >
                  {outputAssetSymbol}
                </Typography>
              </Typography>
            </div>

            <hr className="w-full border-dark-grey" />
            <Typography className="z-20 text-[56px] font-black leading-[54.25px]">
              {time ? timeSaved : feesSaved}
            </Typography>
          </div>
          <div className="flex w-full items-center justify-end">
            <img src={flowersLogoSrc} alt="flowers logo" className="w-auto opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
};
