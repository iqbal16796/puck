import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.json');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get('siteId');

    if (!siteId) {
      return NextResponse.json({ error: 'Missing siteId' }, { status: 400 });
    }

    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      if (data) {
        const db = JSON.parse(data);
        if (db[siteId]) {
          // db[siteId] now contains { templateId, puckData } or just puckData for older entries
          // We will normalize it to return siteData
          return NextResponse.json({ success: true, siteData: db[siteId] });
        }
      }
    }

    return NextResponse.json({ success: false, error: 'Site not found' }, { status: 404 });
  } catch (error) {
    console.error('Failed to get site:', error);
    return NextResponse.json({ error: 'Failed to get site' }, { status: 500 });
  }
}
