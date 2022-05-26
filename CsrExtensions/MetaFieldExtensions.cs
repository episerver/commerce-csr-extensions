using Mediachase.MetaDataPlus;
using Mediachase.MetaDataPlus.Configurator;
using System.Linq;

namespace CsrExtensions
{
    public static class MetaFieldExtensions
    {
        public static void TryAddMetaField(MetaDataContext context,
            MetaClass metaClass,
            string name,
            MetaDataType metaDataType,
            int length,
            bool allowNulls = true,
            bool multiLingual = false,
            bool allowSearch = false)
        {
            var metaField = MetaField.Load(context, name) ?? MetaField.Create(
                                context: context,
                                metaNamespace: metaClass.Namespace,
                                name: name,
                                friendlyName: name,
                                description: name,
                                dataType: metaDataType,
                                length: length,
                                allowNulls: allowNulls,
                                multiLanguageValue: multiLingual,
                                allowSearch: allowSearch,
                                isEncrypted: false);

            if (metaClass.MetaFields.All(x => x.Id != metaField.Id))
            {
                metaClass.AddField(metaField);
            }
            else if (!metaField.DataType.Equals(metaDataType))
            {
                metaClass.DeleteField(metaField.Name);
                MetaField.Delete(context, metaField.Id);
                metaField = MetaField.Create(context,
                                 metaClass.Namespace,
                                 name,
                                 name,
                                 name,
                                 metaDataType,
                                 length,
                                 allowNulls,
                                 multiLingual,
                                 allowSearch,
                                 false);
                metaClass.AddField(metaField);
            }
        }
    }
}
