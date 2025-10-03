import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { menuName } = await request.json();

    // バリデーション
    if (!menuName || typeof menuName !== 'string') {
      return NextResponse.json(
        { error: 'メニュー名が必要です' },
        { status: 400 }
      );
    }

    if (menuName.length > 100) {
      return NextResponse.json(
        { error: 'メニュー名は100文字以内にしてください' },
        { status: 400 }
      );
    }

    // OpenAI APIキーの確認
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json(
        { error: 'API設定エラー' },
        { status: 500 }
      );
    }

    // プロンプト整形
    const prompt = `A high-quality, appetizing photo of ${menuName}, professional food photography, well-lit, restaurant quality, 背景は明るめのテーブルとしてください`;

    // OpenAI Images APIを呼び出し（DALL-E 3使用）
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024', // DALL-E 3は1024x1024, 1024x1792, 1792x1024のみサポート
        quality: 'standard',
        response_format: 'b64_json', // base64形式で取得
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: '画像生成に失敗しました' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const base64Image = data.data[0].b64_json;

    // base64画像をdata URIに変換
    const imageDataUri = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({ image: imageDataUri });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}