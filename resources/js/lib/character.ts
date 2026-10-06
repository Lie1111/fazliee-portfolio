/**
 * Placeholder 3D character assets generated from the project brief appendix.
 *
 * These are generated on demand by the Trae text-to-image endpoint. Swap
 * `characterImage()` for real rendered frames once the final 3D character
 * artwork is delivered — the `Character` component only needs `src` per state.
 */

const BASE_PROMPT =
    '3D Pixar style character portrait of a young Malay man, short neat black hair with a soft fringe, black rectangular framed glasses, warm friendly smile, big expressive eyes, smooth stylized skin, wearing a blue and navy plaid button up shirt, chest up, facing the camera, flat solid saturated red background #FF1E1E, soft studio lighting, subtle rim light, high detail, cinematic render, no text, no watermark';

export type CharacterExpression =
    | 'idle'
    | 'blink'
    | 'wink'
    | 'smile'
    | 'confused'
    | 'thumbsUp';

const EXPRESSION_MODIFIERS: Record<CharacterExpression, string> = {
    idle: 'neutral friendly expression, looking straight at the camera',
    blink: 'eyes fully closed, mid blink',
    wink: 'one eye winking, playful grin',
    smile: 'big open mouth smile, cheerful',
    confused: 'confused expression, raised eyebrow, slight head tilt',
    thumbsUp: 'giving a thumbs up, confident happy smile',
};

export type ImageSize =
    | 'square_hd'
    | 'square'
    | 'portrait_4_3'
    | 'portrait_16_9'
    | 'landscape_4_3'
    | 'landscape_16_9';

/**
 * Build a URL for a placeholder image generated from a prompt.
 */
export function placeholderImage(prompt: string, size: ImageSize = 'landscape_4_3'): string {
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
        prompt,
    )}&image_size=${size}`;
}

/**
 * Build a URL for a placeholder character in a given expression.
 */
export function characterImage(
    expression: CharacterExpression = 'idle',
    size: ImageSize = 'portrait_4_3',
): string {
    return placeholderImage(
        `${BASE_PROMPT}, ${EXPRESSION_MODIFIERS[expression]}`,
        size,
    );
}

/**
 * Build a URL for a flat colour-block project placeholder.
 */
export function projectImage(subject: string, size: ImageSize = 'landscape_16_9'): string {
    return placeholderImage(
        `${subject}, bold flat colour block illustration, saturated red and cream palette, minimal geometric shapes, high contrast, no text, no watermark`,
        size,
    );
}
