import {Parser} from "./state"
import {SourceLocation} from "./location"

// Start an AST node, attaching a start offset.

const pp = Parser.prototype

export class Node {}

pp.startNode = function() {
  let node = new Node
  node.start = this.start
  if (this.options.locations)
    node.loc = new SourceLocation(this, this.startLoc)
  if (this.options.directSourceFile)
    node.sourceFile = this.options.directSourceFile
  if (this.options.ranges)
    node.range = [this.start, 0]
  return node
}

pp.startNodeAt = function(pos, loc) {
  let node = new Node
  if (Array.isArray(pos)){
    if (this.options.locations && loc === undefined) {
      let warned = false
      let msg = 'acron.parser: Usage of startNodeAt(start) is deprecated. please invoke by startNodeAt(start, loc).'
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg)
        } else if (process.traceDeprecation) {
          console.trace(msg)
        } else {
          console.error(msg)
        }
        warned = true
      }
      // flatten pos
      loc = pos[1]
      pos = pos[0]
    }
    else
    {
      throw new Error("acron.parser: parameter 'pos' to member startNodeAt(pos, loc) is expected to be a number, array given.")
    }
  }
  node.start = pos
  if (this.options.locations)
    node.loc = new SourceLocation(this, loc)
  if (this.options.directSourceFile)
    node.sourceFile = this.options.directSourceFile
  if (this.options.ranges)
    node.range = [pos, 0]
  return node
}

// Finish an AST node, adding `type` and `end` properties.

pp.finishNode = function(node, type) {
  node.type = type
  node.end = this.lastTokEnd
  if (this.options.locations)
    node.loc.end = this.lastTokEndLoc
  if (this.options.ranges)
    node.range[1] = this.lastTokEnd
  return node
}

// Finish node at given position

pp.finishNodeAt = function(node, type, pos, loc) {
  node.type = type
  if (Array.isArray(pos)){
    if (this.options.locations && loc === undefined) {
      let warned = false
      let msg = 'acron.parser: Usage of finishNodeAt(start) is deprecated. please invoke by finishNodeAt(start, loc).'
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg)
        } else if (process.traceDeprecation) {
          console.trace(msg)
        } else {
          console.error(msg)
        }
        warned = true
      }
      // flatten pos
      loc = pos[1]
      pos = pos[0]
    }
    else
    {
      throw new Error("acron.parser: parameter 'pos' to member finishNodeAt(pos, loc) is expected to be a number, array given.")
    }
  }
  node.end = pos
  if (this.options.locations)
    node.loc.end = loc
  if (this.options.ranges)
    node.range[1] = pos
  return node
}
