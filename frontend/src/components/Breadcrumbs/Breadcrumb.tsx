import { Link } from "react-router-dom";

interface BreadcrumbProps {
  pageName: string;
}

export const HampersBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/admin-hampers">
              Hampers /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const IngredientsBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/admin-ingredients">
              Ingredients /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const RecipeBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/admin-recipe">
              Recipes /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const ProductBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/admin-products">
              Products /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const PromoBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/admin-points">
              Promo Points /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const EmployeeBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/mo/employee">
              Employee /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const PartnerBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/mo/partner">
              Partner /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const JobBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/mo/job-title">
              Job Title /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const OwnerEmployeeBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/owner/employees">
              Employee /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const IngredientPurchaseBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/mo/ingredient-purchase">
              Ingredient Purchase /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const OtherExpensesBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/mo/other-expenses">
              Other Expenses /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export const CustomersBreadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl font-serif font-bold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/admin/customer">
              Customers /
            </Link>
          </li>
          <li className="font-medium text-blue">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};
