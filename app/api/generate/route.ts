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

    // 1. GPT-4を使って価格を生成
    const priceResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'あなたは日本のファミリーレストランの価格設定の専門家です。メニュー名から適切な価格を円単位で提案してください。一般的なファミレス価格（500円〜1500円程度）を参考にしてください。数字のみを返してください。'
          },
          {
            role: 'user',
            content: `以下のメニューの適切な価格を円単位で提案してください（数字のみ）：${menuName}`
          }
        ],
        temperature: 0.7,
        max_tokens: 10,
      }),
    });

    if (!priceResponse.ok) {
      console.error('OpenAI GPT API error');
      return NextResponse.json(
        { error: '価格生成に失敗しました' },
        { status: 500 }
      );
    }

    const priceData = await priceResponse.json();
    const suggestedPrice = parseInt(priceData.choices[0].message.content.trim(), 10);

    // 価格のバリデーション（数値型チェックのみ）
    const price = isNaN(suggestedPrice) ? 999 : suggestedPrice;

    // 2. プロンプト整形
    const prompt = `A high-quality, appetizing photo of ${menuName}, professional food photography, well-lit, restaurant quality, 背景は明るめのテーブルとしてください`;

    // 3. OpenAI Images APIを呼び出し（DALL-E 3使用）
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
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

    if (!imageResponse.ok) {
      const errorData = await imageResponse.json();
      console.error('OpenAI Images API error:', errorData);
      return NextResponse.json(
        { error: '画像生成に失敗しました' },
        { status: 500 }
      );
    }

    const imageData = await imageResponse.json();
    const base64Image = imageData.data[0].b64_json;

    // base64画像をdata URIに変換
    const imageDataUri = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({
      image: imageDataUri,
      price: price
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}