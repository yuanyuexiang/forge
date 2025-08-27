import { NextRequest, NextResponse } from 'next/server';
import { DIRECTUS_CONFIG } from '../../../lib/directus-config';

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // 使用 Directus GraphQL API 刷新 token
    const response = await fetch(DIRECTUS_CONFIG.GRAPHQL_SYSTEM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation RefreshToken($refresh_token: String!) {
            auth_refresh(refresh_token: $refresh_token) {
              access_token
              refresh_token
              expires
            }
          }
        `,
        variables: {
          refresh_token: refresh_token
        }
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('Refresh token error:', data.errors);
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    if (!data.data?.auth_refresh) {
      return NextResponse.json(
        { error: 'Failed to refresh token' },
        { status: 401 }
      );
    }

    const authData = data.data.auth_refresh;

    return NextResponse.json({
      access_token: authData.access_token,
      refresh_token: authData.refresh_token,
      expires: authData.expires
    });

  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
