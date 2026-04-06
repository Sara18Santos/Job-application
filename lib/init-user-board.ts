import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();
    // Check if the user already has a board
    const existingBoard = await Board.findOne({ userId, name: "My Job Hunt" });

    if (existingBoard) {
      return existingBoard;
    }

    // create a new board for the user
    const board = await Board.create({
      name: "My Job Hunt",
      userId,
      columns: [],
    });

    // create default columns for the board
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplications: [],
        }),
      ),
    );

    // update the board with the created columns
    board.columns = columns.map((col) => col._id);
    await board.save();
    return board;
  } catch (error) {
    console.error("Error initializing user board:", error);
    throw error;
  }
}
