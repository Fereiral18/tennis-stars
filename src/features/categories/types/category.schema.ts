import type { BaseEntity } from "../../../types/common.types";

export interface Category extends BaseEntity {
  name: string;
  description: string;
}

export interface CreateCategoryInput {
  name: string;
  description: string;
}

export interface UpdateCategoryInput {
  name: string;
  description: string;
}