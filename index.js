import Application from "./app/Application.js";
import ErrorHandler from "./app/ErrorHandler.js";
import CommandLine from "./app/CommandLine.js";

const application = new Application();
const errorHandler = new ErrorHandler();
const commandLine = new CommandLine(application.getSession());

commandLine.init(async (input) => {
    try {
        await application.run(input);
    } catch (e) {
        errorHandler.handle(e);
    }
});
