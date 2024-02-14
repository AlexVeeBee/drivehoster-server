interface ConsoleColorsTypes extends Record<string, string> {
    // Reset
    Reset: string;
    // Regular Colors
    Black: string;
    Red: string;
    Green: string;
    Yellow: string;
    Blue: string;
    Magenta: string;
    Cyan: string;
    White: string;
    // Bold
    Bold: string;
    BBlack: string;
    BRed: string;
    BGreen: string;
    BYellow: string;
    BBlue: string;
    BMagenta: string;
    BCyan: string;
    BWhite: string;
}
const ConsoleColors: ConsoleColorsTypes = {
    // Reset
    Reset: "\x1b[0m",
    // Regular Colors
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
    // Bold
    Bold: "\x1b[1m",
    BBlack: "\x1b[1m\x1b[30m",
    BRed: "\x1b[1m\x1b[31m",
    BGreen: "\x1b[1m\x1b[32m",
    BYellow: "\x1b[1m\x1b[33m",
    BBlue: "\x1b[1m\x1b[34m",
    BMagenta: "\x1b[1m\x1b[35m",
    BCyan: "\x1b[1m\x1b[36m",
    BWhite: "\x1b[1m\x1b[37m",
}

type logtypes = "log" | "info" | "warn" | "error" | "success";

const getTimestamp = () => {
    const date = new Date();
    const addZero = (num: number) => {
        if (num < 10) {
            return `0${num}`;
        }
        return num;
    }
    return `[${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}]`;
}

interface Ilogger {
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    clog(colors: string[], type: string, ...args: any[]): void;
}

class logger implements Ilogger {
    constructor() {
        this.init();
    }

    init() {}

    log(...args: any[]) {
        this.consolelog('log', ...args);
    }
    info(...args: any[]) {
        this.consolelog('info', ...args);
    }
    success(...args: any[]) {
        this.consolelog('success', ...args);
    }
    warn(...args: any[]) {
        this.consolelog('warn', ...args);
    }
    error(...args: any[]) {
        this.consolelog('error', ...args);
    }
    // custom log
    // (colors, type, ...args)
    clog(colors: string[], type: string | undefined, ...args: any[]) {
        const date = new Date();
        var color = "";
        // add colors to color string
        colors.forEach((c) => {
            // check if color exists
            if (!ConsoleColors[c]) {
                this.error(`Color ${c} does not exist`);
                return;
            }
            color += ConsoleColors[c];
        });
        let logMessage = []
        logMessage.push(`${getTimestamp()}`);
        if (type) {
            logMessage.push(`[${color}${type.toUpperCase()}${"\x1b[0m"}]`);
        }
        args.forEach((arg) => {
            logMessage.push(`${arg}`);
        });
        logMessage.push("\x1b[0m");
        var logString = logMessage.join(" ");
        console.log(logString);
        // console.log(`[${getTimestamp()}] [${color}${type.toUpperCase()}${"\x1b[0m"}]`, ...args);
    }

    private consolelog = (type: logtypes, ...args: any[]) => {
        const date = new Date();
        var color = "\x1b[0m";
        switch (type) {
            case 'log': color = "\x1b[0m"; break;
            case 'info': color = "\x1b[34m"; break;
            case 'success': color = "\x1b[32m"; break;
            case 'warn': color = "\x1b[33m"; break;
            case 'error': color = "\x1b[31m"; break;
        }
        // Pure white
        console.log(`${getTimestamp()} [${color}${type.toUpperCase()}${"\x1b[0m"}]\x1b[37m`, ...args, "\x1b[0m");
    }
}

export { logger, ConsoleColors, getTimestamp as getTimeConsole };
const log = new logger();
export default log;