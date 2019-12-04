var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("interfaces/iamadrawingspace", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("drawing/canvasspace", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var CanvasSpace;
    return {
        setters: [],
        execute: function () {
            CanvasSpace = /** @class */ (function () {
                function CanvasSpace(Canvas, Context, Left, Top, Width, Height) {
                    this.Canvas = Canvas;
                    this.Context = Context;
                    this.Left = Left;
                    this.Top = Top;
                    this.Width = Width;
                    this.Height = Height;
                }
                Object.defineProperty(CanvasSpace.prototype, "Bottom", {
                    get: function () {
                        return this.Top + this.Height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CanvasSpace.prototype, "Right", {
                    get: function () {
                        return this.Left + this.Width;
                    },
                    enumerable: true,
                    configurable: true
                });
                CanvasSpace.fromId = function (id) {
                    var canvas = document.getElementById(id);
                    canvas.width = canvas.parentElement.clientWidth;
                    canvas.height = canvas.parentElement.clientHeight;
                    return new CanvasSpace(canvas, canvas.getContext("2d"), 0, 0, canvas.width, canvas.height);
                };
                return CanvasSpace;
            }());
            exports_2("CanvasSpace", CanvasSpace);
        }
    };
});
System.register("interfaces/iamsetttings", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var IAmSettings;
    return {
        setters: [],
        execute: function () {
            IAmSettings = /** @class */ (function () {
                function IAmSettings() {
                }
                return IAmSettings;
            }());
            exports_3("IAmSettings", IAmSettings);
        }
    };
});
System.register("settings", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Settings, SelectionSettings;
    return {
        setters: [],
        execute: function () {
            Settings = /** @class */ (function () {
                function Settings() {
                    this.EdgeTension = 1;
                    this.VertexRepulsion = 1;
                    this.Scale = 1;
                    this.SpeedConstant = 1;
                    this.LiveDecisionMaking = false;
                    this.NumberOfCars = 100;
                    // 20
                    this.CarInsertionRate = 60 * this.SpeedConstant + 0 * this.SpeedConstant * Math.random();
                    // 40 * ....
                }
                return Settings;
            }());
            exports_4("Settings", Settings);
            SelectionSettings = /** @class */ (function () {
                function SelectionSettings() {
                    this.OldId = null;
                    this.NewId = null;
                }
                return SelectionSettings;
            }());
            exports_4("SelectionSettings", SelectionSettings);
        }
    };
});
System.register("drawing/drawing", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Drawing;
    return {
        setters: [],
        execute: function () {
            Drawing = /** @class */ (function () {
                function Drawing(X, Y, Scale) {
                    this.X = X;
                    this.Y = Y;
                    this.Scale = Scale;
                    this.drawOrder = 10;
                }
                return Drawing;
            }());
            exports_5("Drawing", Drawing);
        }
    };
});
System.register("model/direction", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Direction;
    return {
        setters: [],
        execute: function () {
            (function (Direction) {
                Direction[Direction["Multidirectional"] = 0] = "Multidirectional";
                Direction[Direction["Forward"] = 1] = "Forward";
                Direction[Direction["Reverse"] = 2] = "Reverse";
            })(Direction || (Direction = {}));
            exports_6("Direction", Direction);
        }
    };
});
System.register("model/traveltimefunction", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("model/lane", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var Lane;
    return {
        setters: [],
        execute: function () {
            Lane = /** @class */ (function () {
                function Lane(Direction, TravelTimeFunction) {
                    this.Direction = Direction;
                    this.TravelTimeFunction = TravelTimeFunction;
                    this.Vehicles = [];
                }
                Object.defineProperty(Lane.prototype, "VehicleCount", {
                    get: function () {
                        return this.Vehicles.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Lane.prototype.addVehicle = function (id) {
                    if (!this.Vehicles.some(function (v) { return v == id; })) {
                        this.Vehicles.push(id);
                    }
                };
                Lane.prototype.removeVehicle = function (id) {
                    this.Vehicles = this.Vehicles.filter(function (v) { return v != id; });
                };
                Lane.prototype.getRemainingTravelTime = function (position) {
                    var ttt = this.TravelTimeFunction(this.VehicleCount);
                    return (1 - position) * ttt;
                };
                return Lane;
            }());
            exports_8("Lane", Lane);
        }
    };
});
System.register("model/road", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Road;
    return {
        setters: [],
        execute: function () {
            Road = /** @class */ (function () {
                function Road(Id, StartId, EndId, Lanes, Highlighted) {
                    if (Highlighted === void 0) { Highlighted = false; }
                    this.Id = Id;
                    this.StartId = StartId;
                    this.EndId = EndId;
                    this.Lanes = Lanes;
                    this.Highlighted = Highlighted;
                }
                return Road;
            }());
            exports_9("Road", Road);
        }
    };
});
System.register("model/junction", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var Junction;
    return {
        setters: [],
        execute: function () {
            Junction = /** @class */ (function () {
                function Junction(Id, Highlighted) {
                    if (Highlighted === void 0) { Highlighted = false; }
                    this.Id = Id;
                    this.Highlighted = Highlighted;
                }
                return Junction;
            }());
            exports_10("Junction", Junction);
        }
    };
});
System.register("drawing/styles", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var Styles;
    return {
        setters: [],
        execute: function () {
            Styles = /** @class */ (function () {
                function Styles() {
                }
                Styles.fillGrass = function (ctx) {
                    ctx.fillStyle = "green";
                    ctx.fill();
                    ctx.setLineDash([]);
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                };
                Styles.fillTarmac = function (ctx, highlighted) {
                    if (highlighted === void 0) { highlighted = false; }
                    ctx.fillStyle = "#828385";
                    if (highlighted) {
                        ctx.fillStyle = "#08a5d8";
                    }
                    ctx.fill();
                };
                Styles.strokeTarmac = function (ctx, highlighted) {
                    if (highlighted === void 0) { highlighted = false; }
                    ctx.strokeStyle = "#828385";
                    if (highlighted) {
                        ctx.strokeStyle = "#08a5d8";
                    }
                    ctx.setLineDash([]);
                    ctx.lineWidth = 11;
                    ctx.stroke();
                };
                Styles.strokeWhiteLine = function (ctx) {
                    ctx.strokeStyle = "white";
                    ctx.setLineDash([4, 2]);
                    ctx.lineWidth = 2;
                    ctx.stroke();
                };
                return Styles;
            }());
            exports_11("Styles", Styles);
        }
    };
});
System.register("drawing/junctionviewmodel", ["drawing/drawing", "drawing/styles"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var drawing_1, styles_1, JunctionViewModel;
    return {
        setters: [
            function (drawing_1_1) {
                drawing_1 = drawing_1_1;
            },
            function (styles_1_1) {
                styles_1 = styles_1_1;
            }
        ],
        execute: function () {
            JunctionViewModel = /** @class */ (function (_super) {
                __extends(JunctionViewModel, _super);
                function JunctionViewModel(x, y, scale, Name, Highlighted) {
                    var _this = _super.call(this, x, y, scale) || this;
                    _this.Name = Name;
                    _this.Highlighted = Highlighted;
                    _this.drawOrder = 20;
                    return _this;
                }
                JunctionViewModel.prototype.draw = function (drawingSpace, settings, selected) {
                    if (selected === void 0) { selected = false; }
                    drawingSpace.Context.beginPath();
                    drawingSpace.Context.arc(this.X, this.Y, settings.Scale * 22, 0, 2 * Math.PI);
                    styles_1.Styles.fillTarmac(drawingSpace.Context, this.Highlighted);
                    if (selected) {
                        drawingSpace.Context.setLineDash([]);
                        drawingSpace.Context.strokeStyle = "green";
                        drawingSpace.Context.lineWidth = 3;
                        drawingSpace.Context.stroke();
                    }
                    drawingSpace.Context.closePath();
                    drawingSpace.Context.beginPath();
                    drawingSpace.Context.arc(this.X, this.Y, settings.Scale * 10, 0, 2 * Math.PI);
                    styles_1.Styles.fillGrass(drawingSpace.Context);
                    drawingSpace.Context.closePath();
                    drawingSpace.Context.beginPath();
                    drawingSpace.Context.arc(this.X, this.Y, settings.Scale * 16, 0, 2 * Math.PI);
                    styles_1.Styles.strokeWhiteLine(drawingSpace.Context);
                    drawingSpace.Context.closePath();
                    drawingSpace.Context.beginPath();
                    drawingSpace.Context.textAlign = "center";
                    drawingSpace.Context.textBaseline = "middle";
                    drawingSpace.Context.font = "15px Consolas";
                    drawingSpace.Context.fillStyle = "white";
                    drawingSpace.Context.fillText(this.Name, this.X, this.Y);
                    drawingSpace.Context.closePath();
                };
                return JunctionViewModel;
            }(drawing_1.Drawing));
            exports_12("JunctionViewModel", JunctionViewModel);
        }
    };
});
System.register("drawing/roadviewmodel", ["drawing/drawing", "drawing/styles"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var drawing_2, styles_2, RoadViewModel;
    return {
        setters: [
            function (drawing_2_1) {
                drawing_2 = drawing_2_1;
            },
            function (styles_2_1) {
                styles_2 = styles_2_1;
            }
        ],
        execute: function () {
            RoadViewModel = /** @class */ (function (_super) {
                __extends(RoadViewModel, _super);
                function RoadViewModel(x, y, X2, Y2, scale, Highlighted) {
                    if (scale === void 0) { scale = 1; }
                    var _this = _super.call(this, x, y, scale) || this;
                    _this.X2 = X2;
                    _this.Y2 = Y2;
                    _this.Highlighted = Highlighted;
                    _this.drawOrder = 20;
                    return _this;
                }
                RoadViewModel.prototype.draw = function (drawingSpace, settings) {
                    drawingSpace.Context.beginPath();
                    drawingSpace.Context.moveTo(this.X, this.Y);
                    drawingSpace.Context.lineTo(this.X2, this.Y2);
                    styles_2.Styles.strokeTarmac(drawingSpace.Context, this.Highlighted);
                    drawingSpace.Context.closePath();
                    drawingSpace.Context.beginPath();
                    drawingSpace.Context.moveTo(this.X, this.Y);
                    drawingSpace.Context.lineTo(this.X2, this.Y2);
                    styles_2.Styles.strokeWhiteLine(drawingSpace.Context);
                    drawingSpace.Context.closePath();
                };
                return RoadViewModel;
            }(drawing_2.Drawing));
            exports_13("RoadViewModel", RoadViewModel);
        }
    };
});
System.register("drawing/vector", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Vector;
    return {
        setters: [],
        execute: function () {
            Vector = /** @class */ (function () {
                function Vector(X, Y) {
                    this.X = X;
                    this.Y = Y;
                }
                Vector.prototype.distance = function (otherVector) {
                    return Math.sqrt((this.X - otherVector.X) * (this.X - otherVector.X) + (this.Y - otherVector.Y) * (this.Y - otherVector.Y));
                };
                Vector.prototype.add = function (otherVector) {
                    return new Vector(this.X + otherVector.X, this.Y + otherVector.Y);
                };
                Vector.prototype.subtract = function (otherVector) {
                    return new Vector(this.X - otherVector.X, this.Y - otherVector.Y);
                };
                Vector.prototype.times = function (m) {
                    return new Vector(this.X * m, this.Y * m);
                };
                Vector.prototype.equals = function (otherVector) {
                    return (this.X == otherVector.X) && (this.Y == otherVector.Y);
                };
                Vector.prototype.directionVector = function (otherVector) {
                    return otherVector.subtract(this).times(1 / this.distance(otherVector));
                };
                Vector.prototype.inverse = function () {
                    return new Vector(1 / this.X, 1 / this.Y);
                };
                Vector.prototype.reverse = function () {
                    return new Vector(-this.X, -this.Y);
                };
                Vector.prototype.limit = function (magnitude) {
                    var max = this.times(magnitude / this.distance(new Vector(0, 0)));
                    var x = this.X < 0 ? Math.max(this.X, max.X) : Math.min(this.X, max.X);
                    var y = this.Y < 0 ? Math.max(this.Y, max.Y) : Math.min(this.Y, max.Y);
                    return new Vector(x, y);
                };
                Vector.prototype.random = function (distance) {
                    return new Vector(this.X + Math.random() * distance - distance / 2, this.Y + Math.random() * distance - distance / 2);
                };
                return Vector;
            }());
            exports_14("Vector", Vector);
        }
    };
});
System.register("drawing/roadxy", ["drawing/vector"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var vector_1, RoadXY;
    return {
        setters: [
            function (vector_1_1) {
                vector_1 = vector_1_1;
            }
        ],
        execute: function () {
            RoadXY = /** @class */ (function (_super) {
                __extends(RoadXY, _super);
                function RoadXY(X, Y, AverageRoadTravelTime) {
                    var _this = _super.call(this, X, Y) || this;
                    _this.X = X;
                    _this.Y = Y;
                    _this.AverageRoadTravelTime = AverageRoadTravelTime;
                    return _this;
                }
                RoadXY.fromVector = function (vector, averageRoadTravelTime) {
                    return new RoadXY(vector.X, vector.Y, averageRoadTravelTime);
                };
                return RoadXY;
            }(vector_1.Vector));
            exports_15("RoadXY", RoadXY);
        }
    };
});
System.register("drawing/junctionxy", ["drawing/vector"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var vector_2, JunctionXY;
    return {
        setters: [
            function (vector_2_1) {
                vector_2 = vector_2_1;
            }
        ],
        execute: function () {
            JunctionXY = /** @class */ (function () {
                function JunctionXY(Junction, P, Roads) {
                    this.Junction = Junction;
                    this.P = P;
                    this.Roads = Roads;
                    this.V = new vector_2.Vector(0, 0);
                    this.Selected = false;
                }
                JunctionXY.prototype.update = function (C, otherJunctions, otherRoads) {
                    if (this.Selected) {
                        return;
                    }
                    var self = this;
                    self.A = (self.P.directionVector(C).times(0.5).add(self.P.subtract(C).reverse().times(0.001)));
                    otherJunctions.forEach(function (j) {
                        self.A = self.A.add((self.P.subtract(j.P)).inverse().times(11));
                        if (self.Roads.some(function (r) { return r == j.Junction.Id; })) {
                            self.A = self.A.add(j.P.directionVector(self.P).reverse().times(0.5));
                        }
                    });
                    // road tension
                    otherRoads.forEach(function (r) {
                        self.A = self.A.add((self.P.subtract(r)).inverse().times(8));
                        //decrease tension on busy roads?
                        //self.A = self.A.add((self.P.subtract(r)).inverse().times(r.AverageRoadTravelTime / 50))
                    });
                    //dampen
                    self.A = self.A.subtract(self.V.times(0.08));
                    this.V = this.V.add(this.A).limit(4);
                    this.P = this.P.add(this.V);
                };
                JunctionXY.prototype.didIGetClicked = function (clickPos, scale) {
                    if (scale === void 0) { scale = 1; }
                    return this.P.distance(clickPos) < 22 * scale;
                };
                return JunctionXY;
            }());
            exports_16("JunctionXY", JunctionXY);
        }
    };
});
System.register("model/scoringfunction", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("model/path", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var Path;
    return {
        setters: [],
        execute: function () {
            Path = /** @class */ (function () {
                function Path(roadScoringFunction, junctionScoringFunction, junctions, roads) {
                    if (junctionScoringFunction === void 0) { junctionScoringFunction = function (junction) { return 0; }; }
                    this.roadScoringFunction = roadScoringFunction;
                    this.junctionScoringFunction = junctionScoringFunction;
                    this.IsLastJunction = true;
                    this.RoadSequence = [];
                    this.JunctionSequence = [];
                    this.Score = 0;
                    var self = this;
                    junctions.forEach(function (j) {
                        self.addJunction(j);
                    });
                    roads.forEach(function (r) {
                        self.addRoad(r);
                    });
                }
                Path.prototype.hasDuplicateJunctions = function () {
                    var juncs = [];
                    for (var i = 0; i < this.JunctionSequence.length; i++) {
                        if (juncs.indexOf(this.JunctionSequence[i]) > -1) {
                            return true;
                        }
                        juncs.push(this.JunctionSequence[i]);
                    }
                    return false;
                };
                Path.prototype.getScore = function () {
                    var _this = this;
                    var score = 0;
                    this.JunctionSequence.forEach(function (j) { return score += _this.junctionScoringFunction(j); });
                    this.RoadSequence.forEach(function (r) { return score += _this.roadScoringFunction(r); });
                    return score;
                };
                Path.prototype.addRoad = function (road) {
                    this.RoadSequence.push(road);
                    this.Score += this.roadScoringFunction(road);
                    this.IsLastJunction = false;
                };
                Path.prototype.addJunction = function (junction) {
                    this.JunctionSequence.push(junction);
                    this.Score += this.junctionScoringFunction(junction);
                    this.IsLastJunction = true;
                };
                Path.prototype.getLatestJunction = function () {
                    return this.JunctionSequence[this.JunctionSequence.length - 1];
                };
                Path.prototype.join = function (otherPath) {
                    if (otherPath.JunctionSequence[0].Id != this.getLatestJunction().Id) {
                        throw new Error("these paths cannot be joined");
                    }
                    return new Path(this.roadScoringFunction, this.junctionScoringFunction, this.JunctionSequence.concat(otherPath.JunctionSequence.splice(1)), this.RoadSequence.concat(otherPath.RoadSequence));
                };
                Path.prototype.subPath = function (junctionIndex) {
                    return new Path(this.roadScoringFunction, this.junctionScoringFunction, this.JunctionSequence.slice(0, junctionIndex + 1), this.RoadSequence.slice(0, junctionIndex));
                };
                return Path;
            }());
            exports_18("Path", Path);
        }
    };
});
System.register("interfaces/iamaroadnetwork", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("model/localnetwork", ["model/road", "model/lane", "model/direction", "model/path"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var road_1, lane_1, direction_1, path_1, LocalNetwork;
    return {
        setters: [
            function (road_1_1) {
                road_1 = road_1_1;
            },
            function (lane_1_1) {
                lane_1 = lane_1_1;
            },
            function (direction_1_1) {
                direction_1 = direction_1_1;
            },
            function (path_1_1) {
                path_1 = path_1_1;
            }
        ],
        execute: function () {
            LocalNetwork = /** @class */ (function () {
                function LocalNetwork(Junctions, Roads) {
                    this.Junctions = Junctions;
                    this.Roads = Roads;
                }
                LocalNetwork.prototype.addJunction = function (junction) {
                    this.Junctions.push(junction);
                };
                LocalNetwork.prototype.connectJunctions = function (id, junction1Id, junction2Id) {
                    this.Roads.push(new road_1.Road(id, junction1Id, junction2Id, []));
                };
                LocalNetwork.prototype.addRoad = function (road) {
                    this.Roads.push(road);
                };
                LocalNetwork.prototype.addLaneToRoad = function (roadId, travelTimeFunction, direction) {
                    if (direction === void 0) { direction = direction_1.Direction.Multidirectional; }
                    var relevantRoads = this.Roads.filter(function (r) { return r.Id === roadId; });
                    if (relevantRoads.length < 1) {
                        throw new Error("No road exists with Id: " + roadId);
                    }
                    relevantRoads[0].Lanes.push(new lane_1.Lane(direction, travelTimeFunction));
                };
                LocalNetwork.prototype.getPaths = function (junction1Id, junction2Id, roadScoringFunction, junctionScoringFunction) {
                    throw new Error("Method not implemented.");
                };
                LocalNetwork.prototype.findJunction = function (id) {
                    return this.Junctions.filter(function (j) { return j.Id == id; })[0];
                };
                LocalNetwork.prototype.findRoads = function (id) {
                    return this.Roads.filter(function (r) { return r.StartId == id || r.EndId == id; });
                };
                LocalNetwork.prototype.findOppositeJunctionOfRoad = function (junctionId, road) {
                    if (road.StartId == junctionId) {
                        return this.findJunction(road.EndId);
                    }
                    return this.findJunction(road.StartId);
                };
                LocalNetwork.prototype.calculateQuickestPathBetweenJunctions = function (junction1, junction2) {
                    if (junction1 == null || junction2 == null) {
                        return;
                    }
                    var self = this;
                    var usedJunctions = [junction1];
                    var paths = [new path_1.Path(function (r) { return r.Lanes[0].getRemainingTravelTime(0); }, function () { return 0; }, [junction1], [])];
                    var destinationFound = false;
                    while (!destinationFound) {
                        var minScore = Infinity;
                        var min = paths[0];
                        var minIndex = 0;
                        for (var i = 0; i < paths.length; i++) {
                            var pathScore = paths[i].getScore();
                            if (pathScore <= minScore) {
                                minScore = pathScore;
                                min = paths[i];
                                minIndex = i;
                            }
                        }
                        var minPathLastJunction = min.getLatestJunction();
                        if (minPathLastJunction == junction2) {
                            destinationFound = true;
                            return min;
                        }
                        var childPaths = self.findRoads(minPathLastJunction.Id).map(function (r) {
                            return new path_1.Path(min.roadScoringFunction, min.junctionScoringFunction, min.JunctionSequence.concat([self.findOppositeJunctionOfRoad(minPathLastJunction.Id, r)]), min.RoadSequence.concat([r]));
                        });
                        paths.splice(minIndex, 1);
                        paths = paths.concat(childPaths.filter(function (cp) { return !cp.hasDuplicateJunctions(); }));
                    }
                };
                LocalNetwork.prototype.calculateQuickestPath = function (junction1Id, junction2Id) {
                    return this.calculateQuickestPathBetweenJunctions(this.findJunction(junction1Id), this.findJunction(junction2Id));
                };
                LocalNetwork.prototype.unHighlight = function () {
                    this.Junctions.forEach(function (j) { return j.Highlighted = false; });
                    this.Roads.forEach(function (r) { return r.Highlighted = false; });
                };
                return LocalNetwork;
            }());
            exports_20("LocalNetwork", LocalNetwork);
        }
    };
});
System.register("helpers/guid", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var Guid;
    return {
        setters: [],
        execute: function () {
            Guid = /** @class */ (function () {
                function Guid() {
                }
                Guid.newGuid = function () {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                };
                return Guid;
            }());
            exports_21("Guid", Guid);
        }
    };
});
System.register("drawing/car", ["helpers/guid"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var guid_1, colours, Car;
    return {
        setters: [
            function (guid_1_1) {
                guid_1 = guid_1_1;
            }
        ],
        execute: function () {
            colours = ["red", "navy", "black", "darkorange"];
            Car = /** @class */ (function () {
                function Car(Path, finalReport) {
                    this.Path = Path;
                    this.finalReport = finalReport;
                    this.Id = guid_1.Guid.newGuid();
                    this.Stage = 0;
                    this.Position = 0;
                    this.Started = false;
                    this.Finished = false;
                    this.Colour = colours[Math.floor(Math.random() * 4)];
                    this._stageStartTime = new Date().getTime();
                }
                Car.prototype.updatePathAtJunctions = function (func) {
                    this.gpsFunc = func;
                };
                Car.prototype.update = function () {
                    if (this.Finished) {
                        return;
                    }
                    var currentTime = new Date().getTime() - this._stageStartTime;
                    if (!this.Started) {
                        this.Path.RoadSequence[this.Stage].Lanes[0].addVehicle(this.Id);
                        this.Started = true;
                        this._carStartTime = new Date().getTime();
                    }
                    var remainingTime = this.Path.RoadSequence[this.Stage].Lanes[0].getRemainingTravelTime(this.Position);
                    this.Position += (currentTime / (remainingTime > 0 ? remainingTime : 0.01)) * (1 - this.Position); //(currentTime % 5000) / 5000;
                    if (this.Position >= 1) {
                        this.Path.RoadSequence[this.Stage].Lanes[0].removeVehicle(this.Id);
                        this.Position = 0;
                        this.Stage++;
                        if (this.Stage >= this.Path.RoadSequence.length) {
                            this.Finished = true;
                            var totalTime = new Date().getTime() - this._carStartTime;
                            this.finalReport(totalTime);
                            return;
                        }
                        if (this.gpsFunc != null) {
                            var achievedPath = this.Path.subPath(this.Stage);
                            this.Path = achievedPath.join(this.gpsFunc(achievedPath.getLatestJunction()));
                        }
                        this.Path.RoadSequence[this.Stage].Lanes[0].addVehicle(this.Id);
                    }
                    this._stageStartTime = new Date().getTime();
                };
                return Car;
            }());
            exports_22("Car", Car);
        }
    };
});
System.register("drawing/localnetworkviewmodel", ["drawing/drawing", "drawing/junctionviewmodel", "drawing/roadviewmodel", "drawing/vector", "drawing/junctionxy", "drawing/roadxy"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var drawing_3, junctionviewmodel_1, roadviewmodel_1, vector_3, junctionxy_1, roadxy_1, LocalNetworkViewModel;
    return {
        setters: [
            function (drawing_3_1) {
                drawing_3 = drawing_3_1;
            },
            function (junctionviewmodel_1_1) {
                junctionviewmodel_1 = junctionviewmodel_1_1;
            },
            function (roadviewmodel_1_1) {
                roadviewmodel_1 = roadviewmodel_1_1;
            },
            function (vector_3_1) {
                vector_3 = vector_3_1;
            },
            function (junctionxy_1_1) {
                junctionxy_1 = junctionxy_1_1;
            },
            function (roadxy_1_1) {
                roadxy_1 = roadxy_1_1;
            }
        ],
        execute: function () {
            LocalNetworkViewModel = /** @class */ (function (_super) {
                __extends(LocalNetworkViewModel, _super);
                function LocalNetworkViewModel(DrawingSpace, scale, Network) {
                    var _this = _super.call(this, DrawingSpace.Left + DrawingSpace.Width / 2, DrawingSpace.Top + DrawingSpace.Height / 2, scale) || this;
                    _this.DrawingSpace = DrawingSpace;
                    _this.Network = Network;
                    _this.RoadsXY = [];
                    _this.Cars = [];
                    var self = _this;
                    _this.Junctions = self.Network.Junctions.map(function (j) {
                        var rs = self.Network.Roads.filter(function (r) { return r.StartId == j.Id; }).map(function (r) { return r.EndId; });
                        var re = self.Network.Roads.filter(function (r) { return r.EndId == j.Id; }).map(function (r) { return r.StartId; });
                        return new junctionxy_1.JunctionXY(j, (new vector_3.Vector(_this.X, _this.Y)).random(20), rs.concat(re));
                    });
                    return _this;
                }
                LocalNetworkViewModel.prototype.recentre = function () {
                    var _this = this;
                    this.Junctions.forEach(function (j) { return j.P = (new vector_3.Vector(_this.X, _this.Y)).random(20); });
                };
                LocalNetworkViewModel.prototype.addRoad = function (road) {
                    this.Junctions.forEach(function (j) {
                        if (j.Junction.Id == road.StartId) {
                            j.Roads.push(road.EndId);
                        }
                        if (j.Junction.Id == road.EndId) {
                            j.Roads.push(road.StartId);
                        }
                    });
                };
                LocalNetworkViewModel.prototype.addCar = function (car) {
                    this.Cars.push(car);
                };
                LocalNetworkViewModel.prototype.addJunction = function (junction) {
                    this.Junctions.push(new junctionxy_1.JunctionXY(junction, (new vector_3.Vector(this.X, this.Y)).random(20), []));
                };
                LocalNetworkViewModel.prototype.draw = function (drawingSpace, settings) {
                    var _this = this;
                    var self = this;
                    drawingSpace.Context.clearRect(drawingSpace.Left, drawingSpace.Top, drawingSpace.Width, drawingSpace.Height);
                    this.RoadsXY = [];
                    this.Network.Roads.forEach(function (r) {
                        var j1 = _this.Junctions.filter(function (j) { return j.Junction.Id == r.StartId; })[0];
                        var j2 = _this.Junctions.filter(function (j) { return j.Junction.Id == r.EndId; })[0];
                        var rvm = new roadviewmodel_1.RoadViewModel(j1.P.X, j1.P.Y, j2.P.X, j2.P.Y, settings.Scale, r.Highlighted);
                        rvm.draw(drawingSpace, settings);
                        self.RoadsXY.push(roadxy_1.RoadXY.fromVector(j1.P.add(j2.P.subtract(j1.P).times(0.5)), r.Lanes[0].getRemainingTravelTime(0)));
                    });
                    this.Junctions.forEach(function (j) {
                        var jvm = new junctionviewmodel_1.JunctionViewModel(j.P.X, j.P.Y, settings.Scale, j.Junction.Id, j.Junction.Highlighted);
                        jvm.draw(drawingSpace, settings, j.Selected);
                    });
                    drawingSpace.Context.beginPath();
                    drawingSpace.Context.fillStyle = "black";
                    drawingSpace.Context.fillText("Cars: " + self.Cars.length, 45, 15);
                    drawingSpace.Context.closePath();
                    this.Cars.forEach(function (c) {
                        if (c.Finished) {
                            return;
                        }
                        var road = c.Path.RoadSequence[c.Stage];
                        var roadStart = c.Path.JunctionSequence[c.Stage].Id;
                        var j1;
                        var j2;
                        if (road.StartId == roadStart) {
                            j1 = _this.Junctions.filter(function (j) { return j.Junction.Id == road.StartId; })[0];
                            j2 = _this.Junctions.filter(function (j) { return j.Junction.Id == road.EndId; })[0];
                        }
                        else {
                            j2 = _this.Junctions.filter(function (j) { return j.Junction.Id == road.StartId; })[0];
                            j1 = _this.Junctions.filter(function (j) { return j.Junction.Id == road.EndId; })[0];
                        }
                        var pos = j1.P.add(j2.P.subtract(j1.P).times(c.Position));
                        drawingSpace.Context.fillStyle = c.Colour;
                        drawingSpace.Context.fillRect(pos.X, pos.Y, 5, 5);
                    });
                };
                LocalNetworkViewModel.prototype.run = function (settings) {
                    var self = this;
                    self.Junctions.forEach(function (j) {
                        j.update(new vector_3.Vector(self.X, self.Y), self.Junctions.filter(function (j2) { return !j2.P.equals(j.P); }), self.RoadsXY);
                    });
                    self.Cars.forEach(function (c) {
                        c.update();
                    });
                    self.Cars = self.Cars.filter(function (c) { return !c.Finished; });
                    self.draw(self.DrawingSpace, settings);
                    window.requestAnimationFrame(function () {
                        self.run(settings);
                    });
                };
                LocalNetworkViewModel.prototype.click = function (clickPos) {
                    var _this = this;
                    var selecteds = this.Junctions.filter(function (j) { return j.didIGetClicked(clickPos, _this.Scale); });
                    if (selecteds.length > 0) {
                        this.SelectedId = selecteds[0].Junction.Id;
                        selecteds[0].Selected = true;
                    }
                };
                LocalNetworkViewModel.prototype.drag = function (init, to) {
                    var _this = this;
                    var selecteds = this.Junctions.filter(function (j) { return j.didIGetClicked(init, _this.Scale); });
                    if (selecteds.length > 0) {
                        this.SelectedId = selecteds[0].Junction.Id;
                        selecteds[0].Selected = true;
                        selecteds[0].P = to;
                    }
                };
                LocalNetworkViewModel.prototype.unclick = function () {
                    this.SelectedId = null;
                    this.Junctions.forEach(function (j) { return j.Selected = false; });
                };
                return LocalNetworkViewModel;
            }(drawing_3.Drawing));
            exports_23("LocalNetworkViewModel", LocalNetworkViewModel);
        }
    };
});
System.register("interfaces/iamacarflow", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("controls/selectionregistrations", ["model/road", "helpers/guid", "model/lane", "model/direction"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var road_2, guid_2, lane_2, direction_2, JunctionSelectionRegistration, JunctionSelectionRegistrationList, DefaultJunctionSelectionRegistrationList;
    return {
        setters: [
            function (road_2_1) {
                road_2 = road_2_1;
            },
            function (guid_2_1) {
                guid_2 = guid_2_1;
            },
            function (lane_2_1) {
                lane_2 = lane_2_1;
            },
            function (direction_2_1) {
                direction_2 = direction_2_1;
            }
        ],
        execute: function () {
            JunctionSelectionRegistration = /** @class */ (function () {
                function JunctionSelectionRegistration(Key, On, eventFunc) {
                    this.Key = Key;
                    this.On = On;
                    this.eventFunc = eventFunc;
                }
                return JunctionSelectionRegistration;
            }());
            exports_25("JunctionSelectionRegistration", JunctionSelectionRegistration);
            JunctionSelectionRegistrationList = /** @class */ (function () {
                function JunctionSelectionRegistrationList(SelectionRegistrations) {
                    this.SelectionRegistrations = SelectionRegistrations;
                }
                JunctionSelectionRegistrationList.prototype.filter = function (filterFunc) {
                    return this.SelectionRegistrations.filter(filterFunc);
                };
                return JunctionSelectionRegistrationList;
            }());
            exports_25("JunctionSelectionRegistrationList", JunctionSelectionRegistrationList);
            DefaultJunctionSelectionRegistrationList = /** @class */ (function (_super) {
                __extends(DefaultJunctionSelectionRegistrationList, _super);
                function DefaultJunctionSelectionRegistrationList(selectionSettings, localNetwork, lnvm, carFlowFunc) {
                    return _super.call(this, [
                        new JunctionSelectionRegistration("t", false, function () {
                            var rd = new road_2.Road(guid_2.Guid.newGuid(), selectionSettings.OldId, lnvm.SelectedId, [new lane_2.Lane(direction_2.Direction.Multidirectional, function (vs) { return 1000 + 200 * vs; })]);
                            localNetwork.addRoad(rd);
                            lnvm.addRoad(rd);
                        }),
                        new JunctionSelectionRegistration("q", false, function () {
                            localNetwork.calculateQuickestPath(selectionSettings.OldId, lnvm.SelectedId);
                        }),
                        new JunctionSelectionRegistration("c", false, function (selectionSettings) {
                            carFlowFunc(selectionSettings, guid_2.Guid.newGuid());
                        })
                    ]) || this;
                }
                return DefaultJunctionSelectionRegistrationList;
            }(JunctionSelectionRegistrationList));
            exports_25("DefaultJunctionSelectionRegistrationList", DefaultJunctionSelectionRegistrationList);
        }
    };
});
System.register("controls/mousecontrol", ["drawing/vector"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var vector_4, MouseControl, StandardMouseSetup;
    return {
        setters: [
            function (vector_4_1) {
                vector_4 = vector_4_1;
            }
        ],
        execute: function () {
            MouseControl = /** @class */ (function () {
                function MouseControl(canvasSpace) {
                    var self = this;
                    var flag = 0;
                    var element = canvasSpace.Canvas;
                    var ticks = 0;
                    var init;
                    element.addEventListener("mousedown", function (e) {
                        flag = 0;
                        ticks = new Date().getTime();
                        init = new vector_4.Vector(e.offsetX, e.offsetY);
                    }, false);
                    element.addEventListener("mousemove", function (e) {
                        flag = 1;
                        var now = new Date().getTime();
                        if (init != null && (now - ticks > 100)) {
                            var newVec = new vector_4.Vector(e.offsetX, e.offsetY);
                            self.ondrag(init, newVec);
                            init = newVec;
                        }
                        else {
                            flag = 0;
                        }
                    }, false);
                    element.addEventListener("mouseup", function (e) {
                        if (flag === 0) {
                            self.onclick(init);
                        }
                        else if (flag === 1) {
                            self.ondrag(init, new vector_4.Vector(e.offsetX, e.offsetY));
                        }
                        init = null;
                    }, false);
                }
                MouseControl.prototype.onclick = function (p) { };
                MouseControl.prototype.ondrag = function (i, p) { };
                return MouseControl;
            }());
            exports_26("MouseControl", MouseControl);
            StandardMouseSetup = /** @class */ (function () {
                function StandardMouseSetup(mc, settings, ss, selectionRegistrations, localNetwork, lnvm, graphCtx, braessRoad) {
                    mc.onclick = function (p) {
                        var srs = selectionRegistrations.filter(function (sr) { return sr.On; });
                        if (srs.length > 0) {
                            srs.forEach(function (sr) {
                                lnvm.unclick();
                                localNetwork.unHighlight();
                                lnvm.click(p);
                                if (lnvm.SelectedId != null && lnvm.SelectedId != ss.OldId) {
                                    ss.NewId = lnvm.SelectedId;
                                    sr.eventFunc(ss);
                                }
                                sr.On = false;
                            });
                            return;
                        }
                        lnvm.unclick();
                        localNetwork.unHighlight();
                        lnvm.click(p);
                    };
                    mc.ondrag = function (i, p) {
                        lnvm.unclick();
                        localNetwork.unHighlight();
                        lnvm.drag(i, p);
                    };
                    document.getElementById("recentre").onclick = function () {
                        lnvm.recentre();
                    };
                    var braessButton = document.getElementById("braess");
                    braessButton.onclick = function () {
                        graphCtx.strokeStyle = "#dd6f6f";
                        var rd = braessRoad;
                        localNetwork.addRoad(rd);
                        lnvm.addRoad(rd);
                        braessButton.remove();
                    };
                    var liveDecisionToggle = document.getElementById("toggleGps");
                    liveDecisionToggle.onclick = function () {
                        liveDecisionToggle.innerText = settings.LiveDecisionMaking ? "Live decisions ON" : "Live decisions OFF";
                        settings.LiveDecisionMaking = !settings.LiveDecisionMaking;
                    };
                }
                return StandardMouseSetup;
            }());
            exports_26("StandardMouseSetup", StandardMouseSetup);
        }
    };
});
System.register("controls/keyboardcontol", ["model/junction", "helpers/guid", "model/road"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var junction_1, guid_3, road_3, KeyFuncRegistration, KeyboardControl, StandardKeyboardSetup;
    return {
        setters: [
            function (junction_1_1) {
                junction_1 = junction_1_1;
            },
            function (guid_3_1) {
                guid_3 = guid_3_1;
            },
            function (road_3_1) {
                road_3 = road_3_1;
            }
        ],
        execute: function () {
            KeyFuncRegistration = /** @class */ (function () {
                function KeyFuncRegistration(Key, KeyFunc) {
                    this.Key = Key;
                    this.KeyFunc = KeyFunc;
                }
                return KeyFuncRegistration;
            }());
            KeyboardControl = /** @class */ (function () {
                function KeyboardControl() {
                    this.registrations = [];
                    var self = this;
                    window.onkeydown = function (e) {
                        var key = e.keyCode || e.charCode;
                        if (key == 8 || key == 46) {
                            self.onKey("delete");
                            return false;
                        }
                    };
                    window.onkeypress = function (e) {
                        self.onKey(String.fromCharCode(e.charCode || e.keyCode));
                    };
                }
                KeyboardControl.prototype.onKey = function (k) {
                    this.registrations.filter(function (r) { return r.Key == k; }).forEach(function (r) { return r.KeyFunc(); });
                };
                KeyboardControl.prototype.registerOnKey = function (key, kf) {
                    this.registrations.push(new KeyFuncRegistration(key, kf));
                };
                ;
                return KeyboardControl;
            }());
            exports_27("KeyboardControl", KeyboardControl);
            StandardKeyboardSetup = /** @class */ (function () {
                function StandardKeyboardSetup(ln, lnvm, selectionSettings, selectionRegistrations) {
                    var kc = new KeyboardControl();
                    kc.registerOnKey("j", function () {
                        var j = window.prompt("new name of junction?");
                        if (!j) {
                            return;
                        }
                        var junc = new junction_1.Junction(j);
                        ln.addJunction(junc);
                        lnvm.addJunction(junc);
                    });
                    kc.registerOnKey("r", function () {
                        var j1 = window.prompt("from?");
                        var j2 = window.prompt("to?");
                        if (!j1 || !j2) {
                            return;
                        }
                        var rd = new road_3.Road(guid_3.Guid.newGuid(), j1, j2, []);
                        ln.addRoad(rd);
                        lnvm.addRoad(rd);
                    });
                    kc.registerOnKey("t", function () {
                        selectionSettings.OldId = lnvm.SelectedId;
                        selectionRegistrations.filter(function (sr) { return sr.Key == "t"; })[0].On = true;
                    });
                    kc.registerOnKey("q", function () {
                        selectionSettings.OldId = lnvm.SelectedId;
                        selectionRegistrations.filter(function (sr) { return sr.Key == "q"; })[0].On = true;
                    });
                    kc.registerOnKey("c", function () {
                        selectionSettings.OldId = lnvm.SelectedId;
                        selectionRegistrations.filter(function (sr) { return sr.Key == "c"; })[0].On = true;
                    });
                }
                return StandardKeyboardSetup;
            }());
            exports_27("StandardKeyboardSetup", StandardKeyboardSetup);
        }
    };
});
System.register("models/braess1", ["model/junction", "model/road", "model/lane", "model/direction", "model/localnetwork", "helpers/guid"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var junction_2, road_4, lane_3, direction_3, localnetwork_1, guid_4, braess1, braess1AdditionalRoad;
    return {
        setters: [
            function (junction_2_1) {
                junction_2 = junction_2_1;
            },
            function (road_4_1) {
                road_4 = road_4_1;
            },
            function (lane_3_1) {
                lane_3 = lane_3_1;
            },
            function (direction_3_1) {
                direction_3 = direction_3_1;
            },
            function (localnetwork_1_1) {
                localnetwork_1 = localnetwork_1_1;
            },
            function (guid_4_1) {
                guid_4 = guid_4_1;
            }
        ],
        execute: function () {
            exports_28("braess1", braess1 = function (settings) { return new localnetwork_1.LocalNetwork([
                new junction_2.Junction("a"),
                new junction_2.Junction("b"),
                new junction_2.Junction("c"),
                new junction_2.Junction("z")
            ], [
                new road_4.Road("r1", "a", "b", [new lane_3.Lane(direction_3.Direction.Multidirectional, (function (vs) { return vs * 100 * settings.SpeedConstant; }))]),
                new road_4.Road("r2", "a", "c", [new lane_3.Lane(direction_3.Direction.Multidirectional, (function (vs) { return 1000 * settings.SpeedConstant + 10 * settings.SpeedConstant * vs; }))]),
                new road_4.Road("r3", "b", "z", [new lane_3.Lane(direction_3.Direction.Multidirectional, (function (vs) { return 1000 * settings.SpeedConstant + 10 * settings.SpeedConstant * vs; }))]),
                new road_4.Road("r4", "c", "z", [new lane_3.Lane(direction_3.Direction.Multidirectional, (function (vs) { return vs * 100 * settings.SpeedConstant; }))])
            ]); });
            exports_28("braess1AdditionalRoad", braess1AdditionalRoad = function (settings) {
                return new road_4.Road(guid_4.Guid.newGuid(), "b", "c", [new lane_3.Lane(direction_3.Direction.Multidirectional, function (vs) { return 100 * settings.SpeedConstant + 10 * vs * settings.SpeedConstant; })]);
            });
        }
    };
});
System.register("models/braess2", ["model/junction", "model/road", "model/lane", "model/direction", "model/localnetwork", "helpers/guid"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var junction_3, road_5, lane_4, direction_4, localnetwork_2, guid_5, braess2, braess2AdditionalRoad;
    return {
        setters: [
            function (junction_3_1) {
                junction_3 = junction_3_1;
            },
            function (road_5_1) {
                road_5 = road_5_1;
            },
            function (lane_4_1) {
                lane_4 = lane_4_1;
            },
            function (direction_4_1) {
                direction_4 = direction_4_1;
            },
            function (localnetwork_2_1) {
                localnetwork_2 = localnetwork_2_1;
            },
            function (guid_5_1) {
                guid_5 = guid_5_1;
            }
        ],
        execute: function () {
            exports_29("braess2", braess2 = function (settings) { return new localnetwork_2.LocalNetwork([
                new junction_3.Junction("a"),
                new junction_3.Junction("b"),
                new junction_3.Junction("c"),
                new junction_3.Junction("d"),
                new junction_3.Junction("z")
            ], [
                new road_5.Road("r1", "a", "d", [new lane_4.Lane(direction_4.Direction.Multidirectional, (function (vs) { return 100; }))]),
                new road_5.Road("r5", "d", "b", [new lane_4.Lane(direction_4.Direction.Multidirectional, (function (vs) { return vs * 100 * settings.SpeedConstant; }))]),
                new road_5.Road("r2", "a", "c", [new lane_4.Lane(direction_4.Direction.Multidirectional, (function (vs) { return 1500 * settings.SpeedConstant + 10 * settings.SpeedConstant * vs; }))]),
                new road_5.Road("r3", "b", "z", [new lane_4.Lane(direction_4.Direction.Multidirectional, (function (vs) { return 1500 * settings.SpeedConstant + 10 * settings.SpeedConstant * vs; }))]),
                new road_5.Road("r4", "c", "z", [new lane_4.Lane(direction_4.Direction.Multidirectional, (function (vs) { return vs * 100 * settings.SpeedConstant; }))])
            ]); });
            exports_29("braess2AdditionalRoad", braess2AdditionalRoad = function (settings) {
                return new road_5.Road(guid_5.Guid.newGuid(), "b", "c", [new lane_4.Lane(direction_4.Direction.Multidirectional, function (vs) { return 100 * settings.SpeedConstant + 10 * vs * settings.SpeedConstant; })]);
            });
        }
    };
});
System.register("drawing/traveltimedisplay", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var TravelTimeDisplay;
    return {
        setters: [],
        execute: function () {
            TravelTimeDisplay = /** @class */ (function () {
                function TravelTimeDisplay(canvasSpace, AnalysisGroupingSize, Settings) {
                    this.canvasSpace = canvasSpace;
                    this.AnalysisGroupingSize = AnalysisGroupingSize;
                    this.Settings = Settings;
                    this.Nums = [];
                    this._graphIndex = 0;
                    canvasSpace.Context.lineWidth = 3;
                    canvasSpace.Context.strokeStyle = "#0a730a";
                }
                TravelTimeDisplay.prototype.addTravelTime = function (n) {
                    this.Nums.push(n);
                    if (this.Nums.length > this.AnalysisGroupingSize) {
                        var tot = 0;
                        this.Nums.forEach(function (n) {
                            tot += n;
                        });
                        if (this._graphIndex > this.canvasSpace.Width) {
                            this.canvasSpace.Context.clearRect(0, 0, this.canvasSpace.Width, this.canvasSpace.Height);
                            this._graphIndex = 0;
                        }
                        this.canvasSpace.Context.beginPath();
                        this.canvasSpace.Context.moveTo(this._graphIndex, this.canvasSpace.Bottom);
                        this.canvasSpace.Context.lineTo(this._graphIndex, this.canvasSpace.Bottom - this.canvasSpace.Height * (tot / (8000 * this.Settings.SpeedConstant * this.AnalysisGroupingSize)));
                        this.canvasSpace.Context.stroke();
                        this.canvasSpace.Context.closePath();
                        this._graphIndex += 5;
                        this.Nums = [];
                    }
                };
                return TravelTimeDisplay;
            }());
            exports_30("TravelTimeDisplay", TravelTimeDisplay);
        }
    };
});
System.register("controls/carflow", ["drawing/car"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var car_1, carFlow;
    return {
        setters: [
            function (car_1_1) {
                car_1 = car_1_1;
            }
        ],
        execute: function () {
            exports_31("carFlow", carFlow = function (lnvm, ln, travelTimeDisplay, settings) {
                return function (selectionSettings, id) {
                    var carNumbers = lnvm.Cars.length;
                    if (carNumbers < settings.NumberOfCars) {
                        ln.unHighlight();
                        var path = ln.calculateQuickestPath(selectionSettings.OldId, selectionSettings.NewId);
                        path.RoadSequence.forEach(function (r) { return r.Highlighted = true; });
                        path.JunctionSequence.forEach(function (j) { return j.Highlighted = true; });
                        var cr = new car_1.Car(path, function (n) { return travelTimeDisplay.addTravelTime(n); });
                        if (settings.LiveDecisionMaking) {
                            cr.updatePathAtJunctions(function (j) { return ln.calculateQuickestPath(j.Id, selectionSettings.NewId); });
                        }
                        lnvm.addCar(cr);
                    }
                    //console.log(carNumbers);
                    window.setTimeout(function () {
                        carFlow(lnvm, ln, travelTimeDisplay, settings)(selectionSettings, id);
                    }, settings.CarInsertionRate);
                };
            });
        }
    };
});
System.register("main", ["drawing/canvasspace", "settings", "drawing/localnetworkviewmodel", "controls/mousecontrol", "controls/keyboardcontol", "controls/selectionregistrations", "models/braess1", "drawing/traveltimedisplay", "controls/carflow"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var canvasspace_1, settings_1, localnetworkviewmodel_1, mousecontrol_1, keyboardcontol_1, selectionregistrations_1, braess1_1, traveltimedisplay_1, carflow_1, canvasSpace, graphCanvas, settings, ss, speedConst, ln, n, mc, travelTimeDisplay, selectionRegistrations, sksu, smsu, selection;
    return {
        setters: [
            function (canvasspace_1_1) {
                canvasspace_1 = canvasspace_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (localnetworkviewmodel_1_1) {
                localnetworkviewmodel_1 = localnetworkviewmodel_1_1;
            },
            function (mousecontrol_1_1) {
                mousecontrol_1 = mousecontrol_1_1;
            },
            function (keyboardcontol_1_1) {
                keyboardcontol_1 = keyboardcontol_1_1;
            },
            function (selectionregistrations_1_1) {
                selectionregistrations_1 = selectionregistrations_1_1;
            },
            function (braess1_1_1) {
                braess1_1 = braess1_1_1;
            },
            function (traveltimedisplay_1_1) {
                traveltimedisplay_1 = traveltimedisplay_1_1;
            },
            function (carflow_1_1) {
                carflow_1 = carflow_1_1;
            }
        ],
        execute: function () {
            canvasSpace = canvasspace_1.CanvasSpace.fromId("main");
            graphCanvas = canvasspace_1.CanvasSpace.fromId("graph");
            settings = new settings_1.Settings();
            ss = new settings_1.SelectionSettings();
            speedConst = 1;
            ln = braess1_1.braess1(settings);
            n = new localnetworkviewmodel_1.LocalNetworkViewModel(canvasSpace, 1, ln);
            n.run(settings);
            mc = new mousecontrol_1.MouseControl(canvasSpace);
            travelTimeDisplay = new traveltimedisplay_1.TravelTimeDisplay(graphCanvas, 1, settings);
            selectionRegistrations = new selectionregistrations_1.DefaultJunctionSelectionRegistrationList(ss, ln, n, carflow_1.carFlow(n, ln, travelTimeDisplay, settings));
            sksu = new keyboardcontol_1.StandardKeyboardSetup(ln, n, ss, selectionRegistrations);
            smsu = new mousecontrol_1.StandardMouseSetup(mc, settings, ss, selectionRegistrations, ln, n, graphCanvas.Context, braess1_1.braess1AdditionalRoad(settings));
            selection = new settings_1.SelectionSettings();
            selection.OldId = "a";
            selection.NewId = "z";
            carflow_1.carFlow(n, ln, travelTimeDisplay, settings)(selection, "one");
        }
    };
});
System.register("drawing/carviewmodel", ["drawing/drawing"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var drawing_4, CarViewModel;
    return {
        setters: [
            function (drawing_4_1) {
                drawing_4 = drawing_4_1;
            }
        ],
        execute: function () {
            CarViewModel = /** @class */ (function (_super) {
                __extends(CarViewModel, _super);
                function CarViewModel(x, y, W, H, Theta, scale) {
                    if (scale === void 0) { scale = 1; }
                    var _this = _super.call(this, x, y, scale) || this;
                    _this.W = W;
                    _this.H = H;
                    _this.Theta = Theta;
                    _this.scale = scale;
                    _this.drawOrder = 20;
                    return _this;
                }
                CarViewModel.prototype.draw = function (drawingSpace, settings) {
                    drawingSpace.Context.beginPath();
                    drawingSpace.Context.fillStyle = "red";
                    drawingSpace.Context.rotate(this.Theta);
                    drawingSpace.Context.fillRect(this.X, this.Y, this.W, this.H);
                    drawingSpace.Context.closePath();
                    drawingSpace.Context.rotate(-this.Theta);
                };
                return CarViewModel;
            }(drawing_4.Drawing));
            exports_33("CarViewModel", CarViewModel);
        }
    };
});
System.register("model/network", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var Network;
    return {
        setters: [],
        execute: function () {
            Network = /** @class */ (function () {
                function Network(SubNetworks) {
                    this.SubNetworks = SubNetworks;
                }
                Network.prototype.addNetwork = function (network) {
                    this.SubNetworks.push(network);
                };
                Network.prototype.getPaths = function (junction1Id, junction2Id, roadScoringFunction, junctionScoringFunction) {
                    throw new Error("Method not implemented.");
                };
                return Network;
            }());
            exports_34("Network", Network);
        }
    };
});
