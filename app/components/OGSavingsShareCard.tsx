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
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 16,
                    padding: 32,
                    width: '80%',
                    maxWidth: 800,
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
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
                        <img src="https://garden-og.vercel.app/flowers.png" alt="flowers" style={{ width: 'auto', height: 32 }} />
                    </div>

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
                        <img
                            src="https://garden-og.vercel.app/PinkStrokes.png"
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
                            <span style={{ fontSize: 20, fontWeight: 500, color: '#111' }}>
                                {time ? 'Time Saved' : 'Cost Saved'}
                            </span>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    color: '#111',
                                }}
                            >
                                <span>{inputAssetSymbol}</span>
                                <span style={{ fontSize: 14 }}>→</span>
                                <span>{outputAssetSymbol}</span>
                            </div>
                        </div>

                        <hr style={{ width: '100%', borderColor: '#374151' }} />

                        <span
                            style={{
                                fontSize: 56,
                                fontWeight: 900,
                                lineHeight: '54px',
                                color: '#111',
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
                            style={{ width: 'auto', height: 28, opacity: 0.9 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
