/** @format */

export function hslToRgb(hsl: number[]): number[] {
    let [hue, saturation, lightness] = hsl;
    hue = hue / 360;
    saturation = saturation / 100;
    lightness = lightness / 100;

    let c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    let x = c * (1 - Math.abs(((hue * 6) % 2) - 1));
    let m = lightness - c / 2;

    let r: number, g: number, b: number;

    if (hue >= 0 && hue < 1 / 6) {
        [r, g, b] = [c, x, 0];
    } else if (hue >= 1 / 6 && hue < 2 / 6) {
        [r, g, b] = [x, c, 0];
    } else if (hue >= 2 / 6 && hue < 3 / 6) {
        [r, g, b] = [0, c, x];
    } else if (hue >= 3 / 6 && hue < 4 / 6) {
        [r, g, b] = [0, x, c];
    } else if (hue >= 4 / 6 && hue < 5 / 6) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }

    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
