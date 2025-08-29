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
        <div style={{
            width: '100%',
            height: '100%',
            background: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
            fontFamily: 'Inter, ui-sans-serif, system-ui',
        }}>
            {/* Main Card */}
            <div style={{
                background: '#111315',
                border: '1px solid #1e2329',
                borderRadius: 16,
                padding: 48,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 600,
                maxWidth: 800,
                textAlign: 'center',
                position: 'relative',
            }}>

                {/* Top Flowers */}
                <div style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    width: 60,
                    height: 60,
                    background: '#34d399',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        src="/flowers.png"
                        alt="flowers"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>

                {/* Main Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 32,
                    marginTop: 40,
                }}>
                    {/* Title */}
                    <div style={{
                        fontSize: 28,
                        color: '#9ca3af',
                        marginBottom: 16,
                        fontWeight: 500,
                    }}>
                        {time ? 'Time Saved' : 'Cost Saved'}
                    </div>

                    {/* Asset Pair */}
                    <div style={{
                        fontSize: 22,
                        color: '#e5e7eb',
                        marginBottom: 24,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                    }}>
                        <span>{inputAssetSymbol}</span>
                        <span style={{ fontSize: 18, color: '#9ca3af' }}>→</span>
                        <span>{outputAssetSymbol}</span>
                    </div>

                    {/* Main Value */}
                    <div style={{
                        fontSize: 72,
                        fontWeight: 900,
                        color: '#34d399',
                        lineHeight: 1,
                        marginBottom: 16,
                    }}>
                        {time ? timeSaved : feesSaved}
                    </div>
                </div>

                {/* Bottom Flowers */}
                <div style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    width: 60,
                    height: 60,
                    background: '#34d399',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        src="/flowersLogo.png"
                        alt="flowers logo"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>

                {/* Pink Strokes Decoration */}
                <div style={{
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        src="/PinkStrokes.png"
                        alt="pink strokes"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
};
