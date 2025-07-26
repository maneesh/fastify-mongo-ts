import { FastifyRequest, FastifyReply, RouteGenericInterface } from "fastify";
import StaticContent from '../models/StaticData';
import mongoose from "mongoose";
import { IStaticContent } from '../models/StaticData';

interface DeleteRequest extends RouteGenericInterface {
  Params: {
    id: string;
  };
}
// delete page
export const deleteStaticDataPage = async (req: FastifyRequest<DeleteRequest>, reply: FastifyReply) => {
  try {
    const { id } = req.params;
    const deletedItem = await StaticContent.findByIdAndDelete(id);

    if (!deletedItem) {
      return reply.code(404).send({ error: "Item not found" });
    }

    reply.send({ message: "Deleted successfully", deletedItem });
  } catch (error) {
    console.error("Delete error:", error);
    reply.code(500).send({ error: "Failed to delete" });
  }
}

// interface DeleteNestedRequest extends FastifyRequest {
//   params: {
//     id: string;
//     itemId: string;
//   };
// }

// //delete nested content inside page
// export const deleteNestedItem = async (req: DeleteNestedRequest, reply: FastifyReply) => {
//   try {
//     const { id, itemId } = req.params;

//     const updatedDoc = await StaticContent.findByIdAndUpdate(
//       id,
//       { $pull: { items: { _id: itemId } } },
//     );

//     if (!updatedDoc) {
//       return reply.code(404).send({ error: "Document not found" });
//     }

//     reply.send({ message: "Nested item deleted", updatedDoc });
//   } catch (error) {
//     console.error("Delete nested error:", error);
//     reply.code(500).send({ error: "Failed to delete nested item" });
//   }
// };


// fastify.delete("/api/static/:id/item/:itemId", deleteNestedItem);



