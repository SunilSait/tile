const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\ELCOT\\Desktop\\sunil\\intern\\projects\\MAGTAN\\tile';

const faviconOld = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect x='4' y='4' width='92' height='92' rx='8' stroke='%232B6B5A' stroke-width='2' stroke-opacity='0.4' fill='none'/%3E%3Crect x='20' y='20' width='25' height='25' rx='3' fill='%232B6B5A' fill-opacity='0.25' stroke='%232B6B5A' stroke-width='1.5'/%3E%3Crect x='55' y='55' width='25' height='25' rx='3' fill='%232B6B5A' fill-opacity='0.25' stroke='%232B6B5A' stroke-width='1.5'/%3E%3C/svg%3E">`;

const faviconNew = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='emeraldGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232B6B5A'/%3E%3Cstop offset='50%25' stop-color='%235AA88E'/%3E%3Cstop offset='100%25' stop-color='%232B6B5A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='4' y='4' width='92' height='92' rx='8' stroke='%232B6B5A' stroke-width='2' stroke-opacity='0.4' fill='none'/%3E%3Crect x='10' y='10' width='80' height='80' rx='5' stroke='%232B6B5A' stroke-width='0.8' stroke-dasharray='4 3' stroke-opacity='0.5' fill='none'/%3E%3Crect x='20' y='20' width='25' height='25' rx='3' fill='url(%23emeraldGrad)' fill-opacity='0.25' stroke='%232B6B5A' stroke-width='1.5'/%3E%3Crect x='55' y='20' width='25' height='25' rx='3' fill='url(%23emeraldGrad)' fill-opacity='0.15' stroke='%232B6B5A' stroke-width='1.5'/%3E%3Crect x='20' y='55' width='25' height='25' rx='3' fill='url(%23emeraldGrad)' fill-opacity='0.15' stroke='%232B6B5A' stroke-width='1.5'/%3E%3Crect x='55' y='55' width='25' height='25' rx='3' fill='url(%23emeraldGrad)' fill-opacity='0.25' stroke='%232B6B5A' stroke-width='1.5'/%3E%3Cpath d='M38 42 L62 42 M50 42 L50 65' stroke='%232B6B5A' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">`;

const logoSvg = `<svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="var(--logo-primary)"/>
                        <stop offset="50%" stop-color="#5AA88E"/>
                        <stop offset="100%" stop-color="var(--logo-primary)"/>
                    </linearGradient>
                </defs>
                <!-- Outer tile border -->
                <rect x="4" y="4" width="92" height="92" rx="8" stroke="var(--logo-primary)" stroke-width="2" stroke-opacity="0.4" fill="none"/>
                <rect x="10" y="10" width="80" height="80" rx="5" stroke="var(--logo-primary)" stroke-width="0.8" stroke-dasharray="4 3" stroke-opacity="0.5" fill="none"/>
                <!-- Mosaic pattern -->
                <rect x="20" y="20" width="25" height="25" rx="3" fill="url(#emeraldGrad)" fill-opacity="0.25" stroke="var(--logo-primary)" stroke-width="1.5"/>
                <rect x="55" y="20" width="25" height="25" rx="3" fill="url(#emeraldGrad)" fill-opacity="0.15" stroke="var(--logo-primary)" stroke-width="1.5"/>
                <rect x="20" y="55" width="25" height="25" rx="3" fill="url(#emeraldGrad)" fill-opacity="0.15" stroke="var(--logo-primary)" stroke-width="1.5"/>
                <rect x="55" y="55" width="25" height="25" rx="3" fill="url(#emeraldGrad)" fill-opacity="0.25" stroke="var(--logo-primary)" stroke-width="1.5"/>
                <!-- T monogram -->
                <path d="M38 42 L62 42 M50 42 L50 65" stroke="var(--logo-primary)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    
    // Replace favicon
    content = content.replace(faviconOld, faviconNew);
    
    // Replace hardcoded auth-logo SVGs
    if (f === '404.html' || f === 'coming-soon.html') {
        const logoRegex = /<svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/;
        content = content.replace(logoRegex, logoSvg);
    }
    
    fs.writeFileSync(path.join(dir, f), content);
    console.log(`Updated ${f}`);
});
