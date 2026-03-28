import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export function GET(_req: NextRequest) {
    // Buffer → ArrayBuffer (Node Buffer shares underlying pool — must slice)
    const fontBuf = readFileSync(
        join(process.cwd(), 'node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf')
    );
    const fontData = fontBuf.buffer.slice(
        fontBuf.byteOffset,
        fontBuf.byteOffset + fontBuf.byteLength
    ) as ArrayBuffer;

    const imgBuf = readFileSync(
        join(process.cwd(), 'public/images/og-product.png')
    );
    const imgSrc = `data:image/png;base64,${imgBuf.toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 80px',
                    fontFamily: 'NotoSans',
                }}
            >
                {/* Glow layers — nested divs fading out, simulates radial blur */}
                <div style={{ position: 'absolute', right: '80px', top: '115px', width: '460px', height: '400px', borderRadius: '50%', background: 'rgba(34,211,238,0.07)', display: 'flex' }} />
                <div style={{ position: 'absolute', right: '120px', top: '155px', width: '380px', height: '320px', borderRadius: '50%', background: 'rgba(34,211,238,0.06)', display: 'flex' }} />
                <div style={{ position: 'absolute', right: '160px', top: '195px', width: '300px', height: '240px', borderRadius: '50%', background: 'rgba(34,211,238,0.05)', display: 'flex' }} />

                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '560px' }}>
                    <div style={{ color: '#52525b', fontSize: '13px', marginBottom: '20px' }}>
                        Cyfrowe laboratorium dentystyczne
                    </div>
                    <div style={{ color: '#fff', fontSize: '48px', lineHeight: 1.1, marginBottom: '28px' }}>
                        Szyny stomatologiczne drukowane 3D
                    </div>
                    <div style={{ color: '#3f3f46', fontSize: '16px' }}>
                        apmdental.pl
                    </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgSrc} alt="" width={460} height={460} style={{ objectFit: 'contain' }} />
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [{ name: 'NotoSans', data: fontData, weight: 400, style: 'normal' }],
        }
    );
}
