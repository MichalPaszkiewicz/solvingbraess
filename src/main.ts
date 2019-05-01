import { CanvasSpace } from "./drawing/canvasspace";
import { Settings, SelectionSettings } from "./settings";
import { LocalNetworkViewModel } from "./drawing/localnetworkviewmodel";
import { MouseControl, StandardMouseSetup } from "./controls/mousecontrol";
import { StandardKeyboardSetup } from "./controls/keyboardcontol";
import { DefaultJunctionSelectionRegistrationList } from "./controls/selectionregistrations";
import { braess1, braess1AdditionalRoad } from "./models/braess1";
import { TravelTimeDisplay } from "./drawing/traveltimedisplay";
import { carFlow } from "./controls/carflow";

var canvasSpace = CanvasSpace.fromId("main");
var graphCanvas = CanvasSpace.fromId("graph");
var settings = new Settings();
var ss = new SelectionSettings();

var speedConst = 1;

var ln = braess1(settings);
var n = new LocalNetworkViewModel(canvasSpace, 1, ln);
n.run(settings);

var mc = new MouseControl(canvasSpace);

var travelTimeDisplay = new TravelTimeDisplay(graphCanvas, 1, settings);

var selectionRegistrations: DefaultJunctionSelectionRegistrationList = new DefaultJunctionSelectionRegistrationList(ss, ln, n, carFlow(n, ln, travelTimeDisplay, settings));

var sksu = new StandardKeyboardSetup(ln, n, ss, selectionRegistrations);
var smsu = new StandardMouseSetup(mc, settings, ss, selectionRegistrations, ln, n, graphCanvas.Context, braess1AdditionalRoad(settings));

var selection = new SelectionSettings();
selection.OldId = "a";
selection.NewId = "z";

carFlow(n, ln, travelTimeDisplay, settings)(selection, "one");