import { FormErrors } from "@/components/ui/form/context";
import { BaseSchema, flatten, parse, ValiError } from "valibot";

export async function validateSchema<Input, Output>(
  schema: BaseSchema<Input, Output, any>,
  values: any
): Promise<[errors: FormErrors, data: null] | [errors: null, data: Output]> {
  try {
    const data = parse(schema, values);
    return [null, data];
  } catch (error) {
    if (error instanceof ValiError) {
      const issues = flatten(error.issues);
      if (!issues.nested)
        return [{ root: issues.root ? issues.root[0] : "" }, null];
      const errors: FormErrors = {};
      for (const err in issues.nested) {
        errors[err] = issues.nested[err]?.[0] ?? "";
      }
      return [errors, null];
    }
    return [
      {
        root: "Invalid data.",
      },
      null,
    ];
  }
}
