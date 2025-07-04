import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Demo authentication logic
    if (email === 'demo@inbola.uz' && password === 'demo123') {
      const user = {
        id: '1',
        email: email,
        name: 'Demo User',
        role: 'user'
      };
      
      return NextResponse.json({
        success: true,
        user,
        message: 'Login successful'
      });
    }
    
    // Admin authentication
    if (email === 'admin@inbola.uz' && password === 'inbola123') {
      const user = {
        id: 'admin',
        email: email,
        name: 'Admin User',
        role: 'admin'
      };
      
      return NextResponse.json({
        success: true,
        user,
        message: 'Admin login successful'
      });
    }

    // Invalid credentials
    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
