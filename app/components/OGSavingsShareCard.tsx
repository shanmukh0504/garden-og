import React from 'react';

type Props = {
  time: boolean;
  inputAssetSymbol: string;
  outputAssetSymbol: string;
  feesSaved?: string;
  timeSaved?: string;
};

export const OGSavingsShareCard: React.FC<Props> = ({
  time = true,
  inputAssetSymbol = 'BTC',
  outputAssetSymbol = 'USDC',
  feesSaved = '$20.01',
  timeSaved = '01m 23s',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1260px',
        height: '630px',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '16px',
          padding: '16px',
          minWidth: '424px',
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
            color: '#111827',
          }}
        >
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
            <img
              src="https://garden-og.vercel.app/flowers.png"
              alt="flowers"
              style={{ width: 'auto', height: '48px' }}
            />
          </div>

          <div
            style={{
              position: 'relative',
              marginBottom: '36px',
              marginTop: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <img
              src="https://garden-og.vercel.app/PinkStrokes.png"
              alt="pink strokes"
              style={{
                position: 'absolute',
                bottom: '-32px',
                right: '-24px',
                zIndex: 1,
                width: '160px',
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                height: '28px',
                width: '100%',
                zIndex: 2,
              }}
            >
              <span style={{ fontSize: '24px', fontWeight: 500 }}>
                {time ? 'Time Saved' : 'Cost Saved'}
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '24px',
                  fontWeight: 500,
                }}
              >
                <span>{inputAssetSymbol}</span>
                <span style={{ fontSize: '14px', padding: '0 2px' }}>→</span>
                <span>{outputAssetSymbol}</span>
              </div>
            </div>

            <hr style={{ width: '100%', borderColor: '#374151' }} />

            <span
              style={{
                fontSize: '56px',
                fontWeight: 700,
                lineHeight: '54px',
                textAlign: 'center',
                zIndex: 2,
              }}
            >
              {time ? timeSaved : feesSaved}
            </span>
          </div>

          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <img
              src="https://garden-og.vercel.app/flowersLogo.png"
              alt="flowers logo"
              style={{ width: 'auto', height: '40px', opacity: 0.9 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
