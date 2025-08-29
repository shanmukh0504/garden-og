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

export const OGSavingsShareCard: React.FC<Props> = ({
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: 16,
          padding: 16,
          minWidth: 424,
          width: '100%',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Top flowers image */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
            <img src={flowersSrc} alt="flowers" style={{ width: 'auto', height: 32 }} />
          </div>

          {/* Content block */}
          <div
            style={{
              position: 'relative',
              marginBottom: 36,
              marginTop: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'center',
            }}
          >
            {/* Pink strokes behind */}
            <img
              src={pinkStrokesSrc}
              alt="pink strokes"
              style={{
                position: 'absolute',
                bottom: -32,
                right: -24,
                zIndex: 0,
                width: 120,
                opacity: 0.8,
              }}
            />

            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                height: 28,
                width: '100%',
                zIndex: 2,
              }}
            >
              <Typography size="h4" weight="medium">
                {time ? 'Time Saved' : 'Cost Saved'}
              </Typography>
              <Typography
                size="h4"
                weight="medium"
                className="flex items-center gap-1"
              >
                <Typography size="h4" weight="medium">
                  {inputAssetSymbol}
                </Typography>
                <ArrowRightIcon className="h-[14px] w-[14px] px-[1px]" />
                <Typography size="h4" weight="medium">
                  {outputAssetSymbol}
                </Typography>
              </Typography>
            </div>

            <hr style={{ width: '100%', borderColor: '#374151' }} />

            {/* Value */}
            <Typography
              className="z-20 text-[56px] font-black leading-[54.25px]"
            >
              {time ? timeSaved : feesSaved}
            </Typography>
          </div>

          {/* Bottom flowers logo */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <img
              src={flowersLogoSrc}
              alt="flowers logo"
              style={{ width: 'auto', height: 28, opacity: 0.9 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
