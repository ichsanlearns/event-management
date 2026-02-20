import { type Request, type Response } from "express";
import {
  create,
  getAll,
  getById,
  getByUserId,
} from "../services/order.service.js";
import { transporter } from "../utils/email.util.js";
import { catchAsync } from "../utils/catch-async.util.js";
import type { Status } from "../generated/prisma/enums.js";
import { createOrderSchema } from "../validators/order.validator.js";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const validatedData = createOrderSchema.parse({
    ...req.body,
  });

  const order = await create({ ...validatedData });

  // await transporter.sendMail({
  //   from: `"Event App" <${process.env.EMAIL_USER}>`,
  //   to: email,
  //   subject: "New order event app",
  //   html: `
  //       <h2>New Order event app</h2>
  //       <p>Order code: ${orderCode}</p>
  //       <p>Quantity: ${quantity}</p>
  //       <p>total: ${total}</p>
  //     `,
  // });

  res.status(201).json(order);
});

export async function getOrderById(req: Request, res: Response) {
  try {
    const order = await getById(req.params.id as string);
    res
      .status(200)
      .json({ message: "Succesfully get order data", data: order });
  } catch (error) {
    res.status(500).json({ message: "Failed to get order" });
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await getAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders" });
  }
}

export const getOrdersByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userid as string;
    const status = req.query.status as string;

    const order = await getByUserId(userId, status);

    res.status(200).json({ message: "Order list by user", data: order });
  },
);
